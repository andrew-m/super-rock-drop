require('mocha')
const { expect } = require('chai')
const assert = require('assert');
const CanvasGameRenderer = require('../model/canvasGameRenderer').CanvasGameRenderer;

describe('Game Renderer for HTML canvas', function() {

    it('Should render rectangle of correct proportions...(onto stubbed something?)', function() {
        let shouldReallyUseAProperMockingFramework = {};

        let stubContext = {
            fillRect: function(startX, startY, endX, endY){
                shouldReallyUseAProperMockingFramework.startX = startX;
                shouldReallyUseAProperMockingFramework.startY = startY;
                shouldReallyUseAProperMockingFramework.endX = endX;
                shouldReallyUseAProperMockingFramework.endY = endY;
            }
        }

        let stubCanvas = {
            getContext : function (arg){if (arg === "2d"){return stubContext}},
            width: 123,
            height: 948 //not real values
        }

        let renderer = new CanvasGameRenderer(stubCanvas);
        renderer.Setup();
        expect(shouldReallyUseAProperMockingFramework.startX).to.equal(0)
        expect(shouldReallyUseAProperMockingFramework.startY).to.equal(0)
        expect(shouldReallyUseAProperMockingFramework.endX).to.equal(123)
        expect(shouldReallyUseAProperMockingFramework.endY).to.equal(948)
    })
})
