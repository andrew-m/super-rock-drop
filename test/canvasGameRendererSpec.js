require('mocha')
const { expect } = require('chai')
const assert = require('assert');
const CanvasGameRenderer = require('../model/canvasGameRenderer').CanvasGameRenderer;
const Blob = require('../model/Blob')

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


    it('Should calculate canvas position when element is in top left corner', function (){
        let canvasWidth = 300;
        let gridWidth = 6;
        let canvasHeight = 600;
        let gridHeight = 12;
        let result = new CanvasGameRenderer().CalculatePositionWidthAndHeight(
            1,1,gridWidth,gridHeight,canvasWidth,canvasHeight
        )

        //x, y, width, height. Remember circles arc around the center, (rectangles from the corner)
        expect(result.x).to.equal(25)
        expect(result.y).to.equal(25)
        expect(result.width).to.equal(50)
        expect(result.height).to.equal(50)
    })

    it('Should calculate canvas position when element is in bottom right corner', function (){
        let canvasWidth = 300;
        let gridWidth = 6;
        let canvasHeight = 600;
        let gridHeight = 12;
        let result = new CanvasGameRenderer().CalculatePositionWidthAndHeight(
            6,12,gridWidth,gridHeight,canvasWidth,canvasHeight
        )

        //x, y, width, height
        expect(result.x).to.equal(275)
        expect(result.y).to.equal(575)
        expect(result.width).to.equal(50)
        expect(result.height).to.equal(50)
    })
})
