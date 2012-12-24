/*jslint nomen: true, debug: true, evil: false, vars: true, sloppy: true, devel: true, browser: true */
/*global describe: false, beforeEach: false, afterEach: false, it: false, expect: false, spyOn: false,
window: false, XSLTemplate: false, jasmine: false */


/**
 * File contains tests for XSLTemplate.js library.
 *
 * @author Andrey Kucherenko <andrey@kucherenko.org>
 */
describe("XSLTemplate.js library tests suite.", function () {
    'use strict';

    describe("Test suite for testing renderFromDOM in IE.", function () {
        var xmlObject = {
            transformNode: function () {}
        }, xslObject, resultRender;

        beforeEach(function () {
            spyOn(xmlObject, 'transformNode').andReturn('fake');
            this.ActiveXObject = window.ActiveXObject;
            window.ActiveXObject = true;
            var xslTemplate = new XSLTemplate();

            resultRender = xslTemplate.renderFromDOM(xmlObject, xslObject);
        });

        afterEach(function () {
            window.ActiveXObject = this.ActiveXObject;
        });

        it("transformNode should be called at xmlObject", function () {
            expect(xmlObject.transformNode).toHaveBeenCalled();
        });

        it("renderFromDOM should return result of transformNode", function () {
            expect(resultRender).toEqual('fake');
        });

        it("xmlObject.transformNode should be called with xslObject variable in parameter", function () {
            expect(xmlObject.transformNode).toHaveBeenCalledWith(xslObject);
        });
    });

    describe("Test suite for testing renderFromDOM in non IE browsers.", function () {
        var xmlObject = {
                transformNode: function () {}
            },
            xslObject,
            resultRender,
            xslTemplate,
            mockProcessor = {
                importStylesheet: function () {},
                transformToDocument: function () {}
            };

        beforeEach(function () {
            xslTemplate = new XSLTemplate();

            //backup objects
            this.ActiveXObject = window.ActiveXObject;
            window.ActiveXObject = false;
            window.XSLTProcessor = window.XSLTProcessor || {};
            this.XSLTProcessor = window.XSLTProcessor;

            //Spies declaration
            spyOn(xmlObject, 'transformNode').andReturn('fake');
            spyOn(mockProcessor, 'importStylesheet');
            spyOn(mockProcessor, 'transformToDocument');
            spyOn(xslTemplate, 'makeXSLTProcessor').andReturn(mockProcessor);
            spyOn(xslTemplate, 'dom2string').andReturn('xml');

            resultRender = xslTemplate.renderFromDOM(xmlObject, xslObject);
        });

        afterEach(function () {
            window.ActiveXObject = this.ActiveXObject;
            window.XSLTProcessor = this.XSLTProcessor;
        });

        it("renderFromDOM should call makeXSLTProcessor function", function () {
            expect(xslTemplate.makeXSLTProcessor).toHaveBeenCalled();
        });

        it("renderFromDOM should call importStylesheet function at XSLProcessor object", function () {
            expect(mockProcessor.importStylesheet).toHaveBeenCalled();
        });

        it("importStylesheet function should call with xslObject as parameter", function () {
            expect(mockProcessor.importStylesheet).toHaveBeenCalledWith(xslObject);
        });

        it("renderFromDOM should call transformToDocument function at XSLProcessor object", function () {
            expect(mockProcessor.transformToDocument).toHaveBeenCalled();
        });

        it("transformToDocument function should call with xslObject as parameter", function () {
            expect(mockProcessor.transformToDocument).toHaveBeenCalledWith(xmlObject);
        });

        it("renderFromDOM should return xml string after window.XMLSerializer", function () {
            expect(resultRender).toEqual('xml');
        });

    });

    it("makeXSLTProcessor should create new instance of window.XSLTProcessor and return it", function () {
        spyOn(window, 'XSLTProcessor');
        var xslTemplate = new XSLTemplate(),
            result = xslTemplate.makeXSLTProcessor();
        expect(window.XSLTProcessor).toHaveBeenCalled();
        expect(typeof result).toBe('object');
    });

    it("dom2string should return string after window.XMLSerializer.serializeToString", function () {
        var xslTemplate = new XSLTemplate();
        this.XMLSerializer = window.XMLSerializer;
        spyOn(window.XMLSerializer.prototype, 'serializeToString').andReturn('string');
        var result = xslTemplate.dom2string({});
        expect(window.XMLSerializer.prototype.serializeToString).toHaveBeenCalled();
        expect(result).toEqual('string');
        window.XMLSerializer = this.XMLSerializer;
    });


    describe("Tests suite for renderFromStrings method", function () {
        var xmlString,
            xslString,
            xslTemplate,
            resultRender;

        beforeEach(function () {
            xslTemplate = new XSLTemplate();

            spyOn(xslTemplate, 'renderFromDOM').andReturn('string');
            spyOn(xslTemplate, 'str2dom').andReturn('string');

            resultRender = xslTemplate.renderFromStrings(xmlString, xslString);
        });

        it("renderFromStrings should call str2dom method with xmlString", function () {
            expect(xslTemplate.str2dom).toHaveBeenCalledWith(xmlString);
        });
    });

});
