// Shape Classifier (Mouse)
// Coding Challenge
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/158-shape-classifier.html
// https://youtu.be/3MqJzMvHE3E

// Generate Dataset: https://github.com/CodingTrain/website/tree/gh-pages/CodingChallenges/CC_158_Shape_Classifier/dataset
// Generate Dataset (port): https://editor.p5js.org/codingtrain/sketches/7leVIzy5l
// Training: https://github.com/CodingTrain/website/tree/gh-pages/CodingChallenges/CC_158_Shape_Classifier/training
// Mouse: https://editor.p5js.org/codingtrain/sketches/JgLVfCS4E
// Webcam: https://editor.p5js.org/codingtrain/sketches/2hZGBkqqq

let shapeClassifier;
let canvas;
let resultsDiv;
let inputImage;
let clearButton;

function setup() {
  canvas = createCanvas(400, 400);
  let options = {
    inputs: [64, 64, 4],
    task: 'imageClassification'
  };
  shapeClassifier = ml5.neuralNetwork(options);
  const modelDetails = {
    model: 'model/model.json',
    metadata: 'model/model_meta.json',
    weights: 'model/model.weights.bin'
  };
  background(255);
  clearButton = createButton('clear');
  clearButton.mousePressed(function() {
    background(255);
  });
  resultsDiv = createDiv('loading model');
  inputImage = createGraphics(64, 64);
  shapeClassifier.load(modelDetails, modelLoaded);
}

function modelLoaded() {
  console.log('model ready!');
  classifyImage();
}

function classifyImage() {
  inputImage.copy(canvas, 0, 0, 400, 400, 0, 0, 64, 64);
  //image(inputImage, 0, 0);
  shapeClassifier.classify(
    {
      image: inputImage
    },
    gotResults
  );
}
var shape="nothing"
function gotResults(err, results) {
  if (err) {
    console.error(err);
    return;
  }

  let label = results[0].label;
  let confidence = nf(100 * results[0].confidence, 2, 0);

  if (label=="square"){
    print("s")
  }else if (label=="circle"){
    print("c")
  }else if(label=="triangle"){
    print("t")
  }else{
    print("o")
  }
  //console.log(results);
  classifyImage();
}

function draw() {
  if (mouseIsPressed) {
    strokeWeight(8);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }

  // stroke(0);
  // noFill();
  // strokeWeight(4);
  // rectMode(CENTER);
  // rect(width/2, height/2, 40);
}
