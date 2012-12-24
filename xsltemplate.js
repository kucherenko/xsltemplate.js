/*jslint nomen: true, debug: true, evil: false, vars: true, sloppy: true, devel: true, browser: true */

/**
 * File contains XSLTemplate.js realisation.
 * XSLTemplate.js is a library for transformation xsl+xml in javascript.
 * XSLTemplate.js support AMD.
 *
 * @example
 * //TODO: write example code for XSLTemplate.js
 *
 * @author Andrey Kucherenko <andrey@kucherenko.org>
 */

(function () {
    'use strict';

    var XSLTemplate = function () {

    };

    XSLTemplate.prototype.renderFromDOM = function (xmlObject, xslObject) {
        var result;
        if (window.ActiveXObject) {
            result = xmlObject.transformNode(xslObject);
        } else if (window.XSLTProcessor) {
            var xsltProcessor = this.makeXSLTProcessor();
            xsltProcessor.importStylesheet(xslObject);
            var resultDocument = xsltProcessor.transformToDocument(xmlObject);
            result = this.dom2string(resultDocument);
        }
        return result;
    };

    XSLTemplate.prototype.dom2string = function (DOMObject) {
        var xmlSerializer = new window.XMLSerializer();
        return xmlSerializer.serializeToString(DOMObject);
    };

    XSLTemplate.prototype.makeXSLTProcessor = function () {
        return new window.XSLTProcessor();
    };

    XSLTemplate.prototype.renderFromStrings = function (xmlString, xslString) {
        var DOMXML = this.str2dom(xmlString);
    };

    XSLTemplate.prototype.str2dom = function (xml) {

    };

    // AMD define happens at the end for compatibility with AMD loaders
    if (typeof define === 'function' && define.amd) {
        define('xsltemplate', function () {
            return XSLTemplate;
        });
    }

}).call(this);
