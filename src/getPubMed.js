"use strict";
const https = require("https");
const xml2js = require("xml2js");
const nodemailer = require("nodemailer");

// Subject to search for
var subject = "malaria";
var subjectCopy = subject;

// Maximum number of results to list
var retMax = 20;
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

// TODO: Add error-checking
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

			printRandomArticle();
    });
  });
});

encodeFirst.catch(function () {
  console.log("Invalid encoding.");
});

function printRandomArticle () {
	var article = articles[Math.floor(Math.random() * articles.length)];
console.log("random article: " + article);

	var abstractURL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=xml&rettype=abstract&id=" + article;
	//var abstractURL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=xml&rettype=abstract&id=28953262";

	https.get(abstractURL, function (res) {
		res.setEncoding("utf8");
		let body = "";
		res.on("data", function (data) {
			body += data;
		});

		res.on("end", function () {
			var parser = new xml2js.Parser();
			parser.parseString(body, function(err, result) {
//console.log(JSON.stringify(result));
			extractDetails(result);
			});
		});
	});
}

function extractDetails(result) {
	var volume = result["PubmedArticleSet"]["PubmedArticle"][0]["MedlineCitation"][0]["Article"][0]["Journal"][0]["JournalIssue"][0]["Volume"];
	var issue = result["PubmedArticleSet"]["PubmedArticle"][0]["MedlineCitation"][0]["Article"][0]["Journal"][0]["JournalIssue"][0]["Issue"];
	var journalTitle = result["PubmedArticleSet"]["PubmedArticle"][0]["MedlineCitation"][0]["Article"][0]["Journal"][0]["Title"];
	var articleTitle = result["PubmedArticleSet"]["PubmedArticle"][0]["MedlineCitation"][0]["Article"][0]["ArticleTitle"];
	var abstract = result["PubmedArticleSet"]["PubmedArticle"][0]["MedlineCitation"][0]["Article"][0]["Abstract"][0]["AbstractText"];

	// All dates are in the form YYYY, MM, DD
	var datePublished = [result["PubmedArticleSet"]["PubmedArticle"][0]["MedlineCitation"][0]["Article"][0]["ArticleDate"][0]["Year"],
											 result["PubmedArticleSet"]["PubmedArticle"][0]["MedlineCitation"][0]["Article"][0]["ArticleDate"][0]["Month"],
										 	 result["PubmedArticleSet"]["PubmedArticle"][0]["MedlineCitation"][0]["Article"][0]["ArticleDate"][0]["Day"]];
	var dateReceived = [];
	var dateRevised = [];
	var dateAccepted = [];

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

	var authorsFirst = [];
	var authorsLast = [];
	var authorsAffiliation = [];

	// Extract all authors
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

	if (volume) {
		console.log("Volume: " + volume);
	}

	if (issue) {
		console.log("Issue: " + issue);
	}

	if (journalTitle) {
		console.log("Journal Title: " + journalTitle);
	}

	if (articleTitle) {
		console.log("Article Title: " + articleTitle);
	}

	if (authorsFirst || authorsLast) {
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
	}

	if (abstract) {
		console.log("Abstract: " + abstract);
	}

	if (datePublished) {
		console.log("Date Published: " + datePublished);
	}

	if (dateReceived) {
		console.log("Date Received: " + dateReceived);
	}

	if (dateRevised) {
		console.log("Date Revised: " + dateRevised);
	}

	if (dateAccepted) {
		console.log("Date Accepted: " + dateAccepted);
	}

}
