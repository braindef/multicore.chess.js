"use strict";

var nodes=[];
var nodePointer = 0;

function retrieve(nodeId, player)
{
  //console.log("nodes: "+ nodes +" nodeId "+nodeId);
  if(nodes[nodeId]==undefined)
  {
    var newNode=new Node(player);
    newNode.player=player;
  }
  return nodes[nodeId];
}


class Node {

  constructor (player)
  { 
    this.player=player;
    this.evaluated=false;
    this.children=[];
    this.moves=[];
    this.id=nodePointer;
    nodePointer++;
    nodes.push(this);
  }

}

function getNode(nodeId)
{
  return nodes[nodeId];
}






/*
var nodes = new Array();
var nodePointer = 0;

class Node {

  constructor (player)
  { 
    this.player=player;
    this.board = board.slice();
    this.id = nodePointer;
    this.value = evaluateBoard();
    this.childPointer = 0;
    this.children = [];
    this.board = [];
    this.lowerbound=null;
    this.upperbound=null;
    this.moves = [];
    nodes.push(this);
    nodePointer+=1;
  }

  firstchild()
  {  //vermutlich hier das possibleMoves(player) TODO: NICHT JEDES MAL
    this.childPointer = 0;

    if(this.moves.length==0)
    {
      this.moves = possibleMoves(this.player);
    }

    var savedData = commitMove(this.moves[0], this.player);

    let newNode = new Node(-this.player);
    
    this.children.push(newNode.id);
    
    revertMove(savedData);
    
    return newNode.id;
  }

  nextbrother()
  {
    this.childPointer += 1;

    var savedData = [];

    try 
    {
      savedData = commitMove(this.moves[this.childPointer], this.player);
    }
    catch(err)
    {
      return "NOCHILD";
    }

    let newNode = new Node(-this.player);

    this.children.push(newNode.id);
    
    revertMove(savedData);
    
    return newNode.id;
  }
}

  function getNode(node)
  {
    if(nodes[node]==undefined)
      new Node(player);
      
    return nodes[node];
  }


function retrieve(node, player)
{
  if(nodes[node]==undefined)
  {
    new Node(player);
    return false;
  }
    
  return true;
}

function store(node, lowerbound, upperbound)
{

}
*/
