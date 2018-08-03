"use strict";

var nodes = new Array();
var nodePointer = 0;

class Node {

  constructor (player)
  { 
    this.player=player;
    this.board = board.slice();
    this.id = nodePointer++;
    this.value = evaluateBoard();
    this.childPointer = 0;
    this.children = [];
    this.board = [];
    this.lowerbound=null;
    this.upperbound=null;
    nodes.push(this);
    nodePointer++;
  }

  firstchild()
  {  //vermutlich hier das possibleMoves(player)
    this.childPointer = 0;

    this.moves = possibleMoves(this.player);

    var savedData = commitMove(this.moves[0], this.player);

    let newNode = new Node(-this.player);
    
    this.children.push(newNode.id);
    
    revertMove(savedData);
    
    return newNode.value;
  }

  nextbrother()
  {
    this.childPointer += 1;

    if(childPointer>this.moves.length)
      return "NOCHILD";

    this.moves = possibleMoves(player);

    var savedData = commitMove(this.moves[this.childPointer], this.player);

    let newNode = new Node(-this.player);

    this.children.push(newNode.id);
    
    revertMove(savedData);
    
    
    return newNode.value;

  }
}

function getNode(node)
  {
    console.log("N: "+node);
    console.log("Obj: "+nodes[node]);
    console.log("ALL: ");
    console.log(nodes);
    return nodes[node];
  }


function retrieve(node, player)
{
  if(nodes[node]==undefined)
    new Node(player);
  
  console.log(nodes);
    
  return false;
}

function store(node, lowerbound, upperbound)
{

}

