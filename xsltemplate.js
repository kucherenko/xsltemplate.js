/*jslint nomen: true, debug: true, evil: false, vars: true, sloppy: true, devel: true, browser: true */

/**
 * File contains XSLTemplate.js realisation.
 * XSLTemplate.js is a library for transformation xsl+xml in javascript.
 * XSLTemplate.js support AMD.
 *
 * @example
 * <code>
 *     var xslTemplate = new XSLTemplate();
 *     //render strings
 *     xslTemplate.renderFromStrings('<xml/>', '<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"></xsl:stylesheet>');
 * </code>
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
        var xmlObject = this.str2dom(xmlString),
            xslObject = this.str2dom(xslString);
        return this.renderFromDOM(xmlObject, xslObject);
    };

    XSLTemplate.prototype.str2dom = function (xml) {
        var parser, result;
        if (window.DOMParser) {
            parser = new window.DOMParser();
            result = parser.parseFromString(xml, 'text/xml');
        } else if (window.ActiveXObject) {
            result = new window.ActiveXObject('Microsoft.XMLDOM');
            result.async = "false";
            result.loadXML(xml);
        }

        return result;
    };

    // AMD define happens at the end for compatibility with AMD loaders
    if (typeof define === 'function' && define.amd) {
        define('xsltemplate', function () {
            return XSLTemplate;
        });
    } else {
        window.XSLTemplate = XSLTemplate;
    }

}).call(this);
