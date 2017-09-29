"use strict";
const https = require("https");
const xml2js = require("xml2js");
//const nodemailer = require("nodemailer");

const NA = "N/A";

// Subject to search for
var subject = "epidemiology";
var subjectCopy = subject;

// Maximum number of results to list
var retMax = 15;
var articles = [];

function encode() {
	var unencoded = subject;
	subject = encodeURIComponent(unencoded).replace(/'/g,"%27").replace(/"/g,"%22");
}

// Make sure subject is encoded first before placing into search URL
var encodeFirst = new Promise(function (fulfill, reject) {
  encode();
  // if (subject === subjectCopy) {
  //   reject();
  // } else {
  //   fulfill();
  // }
	fulfill();
});

encodeFirst.then(function () {
  var searchURL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&retmax=" + retMax + "&term=" + subject;

  https.get(searchURL, function (res) {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", function (data) {
      body += data;
    });

    res.on("end", function () {
      body = JSON.parse(body);

      for (var i = 0; i < body.esearchresult.idlist.length; i++) {
        articles.push(body.esearchresult.idlist[i]);
      }

			// Select random article
			var articleNumber = articles[Math.floor(Math.random() * articles.length)];

			// Select
			printArticle(articleNumber);
    });
  });
});

encodeFirst.catch(function () {
  console.log("Invalid encoding.");
});

function printArticle(articleNumber) {
	// Retrieve article using Pub Med ID
	var abstractURL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=xml&rettype=abstract&id=" + articleNumber;

	https.get(abstractURL, function (res) {
		res.setEncoding("utf8");
		let body = "";
		res.on("data", function (data) {
			body += data;
		});

		res.on("end", function () {
			var parser = new xml2js.Parser();
			parser.parseString(body, function(err, result) {
			extractDetails(result, article);
			});
		});
	});
}

function extractDetails(result, article) {
	var journalTitle, articleTitle;
	var volume, issue;
	var issn, issnType;
	var datePublished = [];
	var dateReceived = [];
	var dateRevised = [];
	var dateAccepted = [];
	var abstract = "";
	var authorsFirst = [];
	var authorsLast = [];
	var authorsAffiliation = [];

	// Retrieve journal title if it exists
	if (result["PubmedArticleSet"]["PubmedArticle"][0]["MedlineCitation"][0]["Article"][0]["Journal"][0]["Title"]) {
		journalTitle = result["PubmedArticleSet"]["PubmedArticle"][0]["MedlineCitation"][0]["Article"][0]["Journal"][0]["Title"];
	} else {
		journalTitle = NA;
	}

	// Retrieve article title if it exists
	if (result["PubmedArticleSet"]["PubmedArticle"][0]["MedlineCitation"][0]["Article"][0]["ArticleTitle"]) {
		articleTitle = result["PubmedArticleSet"]["PubmedArticle"][0]["MedlineCitation"][0]["Article"][0]["ArticleTitle"];
	} else {
		articleTitle = NA;
	}

	// Retrieve volume if it exists
	if (result["PubmedArticleSet"]["PubmedArticle"][0]["MedlineCitation"][0]["Article"][0]["Journal"][0]["JournalIssue"][0]["Volume"]) {
		volume = result["PubmedArticleSet"]["PubmedArticle"][0]["MedlineCitation"][0]["Article"][0]["Journal"][0]["JournalIssue"][0]["Volume"];
	} else {
		volume = NA;
	}

	// Retrieve issue if it exists
	if (result["PubmedArticleSet"]["PubmedArticle"][0]["MedlineCitation"][0]["Article"][0]["Journal"][0]["JournalIssue"][0]["Issue"]) {
		issue = result["PubmedArticleSet"]["PubmedArticle"][0]["MedlineCitation"][0]["Article"][0]["Journal"][0]["JournalIssue"][0]["Issue"];
	} else {
		issue = NA;
	}

	// Retrieve ISSN number if it exists
	if (result["PubmedArticleSet"]["PubmedArticle"][0]["MedlineCitation"][0]["Article"][0]["Journal"][0]["ISSN"][0]["_"]){
		issn = result["PubmedArticleSet"]["PubmedArticle"][0]["MedlineCitation"][0]["Article"][0]["Journal"][0]["ISSN"][0]["_"];
	} else {
		issn = NA;
	}

	// Retrieve ISSN type if it exists
	if (result["PubmedArticleSet"]["PubmedArticle"][0]["MedlineCitation"][0]["Article"][0]["Journal"][0]["ISSN"][0]["$"]["IssnType"]) {
		issnType = result["PubmedArticleSet"]["PubmedArticle"][0]["MedlineCitation"][0]["Article"][0]["Journal"][0]["ISSN"][0]["$"]["IssnType"];
	} else {
		issnType = NA;
	}

	// All dates are in the form YYYY, MM, DD
	// Retrieve publication dates if they exist
	if (result["PubmedArticleSet"]["PubmedArticle"][0]["MedlineCitation"][0]["Article"][0]["ArticleDate"]) {
		datePublished.push(result["PubmedArticleSet"]["PubmedArticle"][0]["MedlineCitation"][0]["Article"][0]["ArticleDate"][0]["Year"],
											 result["PubmedArticleSet"]["PubmedArticle"][0]["MedlineCitation"][0]["Article"][0]["ArticleDate"][0]["Month"],
											 result["PubmedArticleSet"]["PubmedArticle"][0]["MedlineCitation"][0]["Article"][0]["ArticleDate"][0]["Day"]);
	}

	// Retrieve dates for when article was received, revised, and accepted, if available
	for (var i = 0; i < result["PubmedArticleSet"]["PubmedArticle"][0]["PubmedData"][0]["History"][0]["PubMedPubDate"].length; i++) {
		var pubStatus = result["PubmedArticleSet"]["PubmedArticle"][0]["PubmedData"][0]["History"][0]["PubMedPubDate"][i]["$"]["PubStatus"].toLowerCase();
		if (pubStatus === "received") {
			dateReceived.push(result["PubmedArticleSet"]["PubmedArticle"][0]["PubmedData"][0]["History"][0]["PubMedPubDate"][i]["Year"],
												result["PubmedArticleSet"]["PubmedArticle"][0]["PubmedData"][0]["History"][0]["PubMedPubDate"][i]["Month"],
												result["PubmedArticleSet"]["PubmedArticle"][0]["PubmedData"][0]["History"][0]["PubMedPubDate"][i]["Day"]);
		} else if (pubStatus === "revised") {
			dateRevised.push(result["PubmedArticleSet"]["PubmedArticle"][0]["PubmedData"][0]["History"][0]["PubMedPubDate"][i]["Year"],
												result["PubmedArticleSet"]["PubmedArticle"][0]["PubmedData"][0]["History"][0]["PubMedPubDate"][i]["Month"],
												result["PubmedArticleSet"]["PubmedArticle"][0]["PubmedData"][0]["History"][0]["PubMedPubDate"][i]["Day"]);
		} else if (pubStatus === "accepted") {
			dateAccepted.push(result["PubmedArticleSet"]["PubmedArticle"][0]["PubmedData"][0]["History"][0]["PubMedPubDate"][i]["Year"],
												result["PubmedArticleSet"]["PubmedArticle"][0]["PubmedData"][0]["History"][0]["PubMedPubDate"][i]["Month"],
												result["PubmedArticleSet"]["PubmedArticle"][0]["PubmedData"][0]["History"][0]["PubMedPubDate"][i]["Day"]);
		}
	}

	// Retrieve abstract if it exists
	if (result["PubmedArticleSet"]["PubmedArticle"][0]["MedlineCitation"][0]["Article"][0]["Abstract"]) {
		for (var i = 0; i < result["PubmedArticleSet"]["PubmedArticle"][0]["MedlineCitation"][0]["Article"][0]["Abstract"][0]["AbstractText"].length; i++) {
			if (result["PubmedArticleSet"]["PubmedArticle"][0]["MedlineCitation"][0]["Article"][0]["Abstract"][0]["AbstractText"][i]["_"]) {
				abstract += result["PubmedArticleSet"]["PubmedArticle"][0]["MedlineCitation"][0]["Article"][0]["Abstract"][0]["AbstractText"][i]["_"] + " ";
			} else {
				abstract += result["PubmedArticleSet"]["PubmedArticle"][0]["MedlineCitation"][0]["Article"][0]["Abstract"][0]["AbstractText"][i];
			}
		}
	} else {
		abstract = NA;
	}

	// Retrieve all authors if they exist
	if (result["PubmedArticleSet"]["PubmedArticle"][0]["MedlineCitation"][0]["Article"][0]["AuthorList"]) {
		for (var i = 0; i < result["PubmedArticleSet"]["PubmedArticle"][0]["MedlineCitation"][0]["Article"][0]["AuthorList"][0]["Author"].length; i++) {
			var aff = [];
			authorsFirst.push(result["PubmedArticleSet"]["PubmedArticle"][0]["MedlineCitation"][0]["Article"][0]["AuthorList"][0]["Author"][i]["ForeName"]);
			authorsLast.push(result["PubmedArticleSet"]["PubmedArticle"][0]["MedlineCitation"][0]["Article"][0]["AuthorList"][0]["Author"][i]["LastName"]);

			// Affiliations include extraneous information
			// for (var j = 0; j < result["PubmedArticleSet"]["PubmedArticle"][0]["MedlineCitation"][0]["Article"][0]["AuthorList"][0]["Author"][i]["AffiliationInfo"].length; j++) {
			// 	aff.push(result["PubmedArticleSet"]["PubmedArticle"][0]["MedlineCitation"][0]["Article"][0]["AuthorList"][0]["Author"][i]["AffiliationInfo"][j]["Affiliation"]);
			// }
			// authorsAffiliation.push(aff);
		}
	}

	console.log("Article title: " + articleTitle + "\nJournal title: " + journalTitle + "\nVolume: " + volume + "\nIssue: " + issue +
							"\nISSN: " + issn + "\nISSN type: " + issnType + "\nPub Med ID: " + article + "\nDate published: " + datePublished + "\nDate received: " + dateReceived +
							"\nDate revised: " + dateRevised + "\nDate accepted: " + dateAccepted);

	var authors = "";
	for (var i = 0; i < authorsFirst.length; i++) {
		if (i == authorsFirst.length - 2) {
			authors += authorsFirst[i] + " " + authorsLast[i] + ", and ";
		} else if (i == authorsFirst.length - 1) {
			authors += authorsFirst[i] + " " + authorsLast[i] + ". ";
		} else {
			authors += authorsFirst[i] + " " + authorsLast[i] + ", ";
		}
	}
	console.log("Authors: " + authors);

	console.log("Abstract: " + abstract);

}
