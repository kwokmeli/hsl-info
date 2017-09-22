"use strict";
const https = require("https");

// Subject to search for
var subject = "breast cancer";
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
  if (subject === subjectCopy) {
    reject();
  } else {
    fulfill();
  }
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

	https.get(abstractURL, function (res) {
		res.setEncoding("utf8");
		let body = "";
		res.on("data", function (data) {
			body += data;
		});

		res.on("end", function () {
console.log(body);
console.log("type of body: " + typeof body);
		});
	});

}
