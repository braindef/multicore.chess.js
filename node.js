let allNodes = [];

class Node {

  constructor ()
  { 
    this.id = allNodes++;
    this.value = evaluateBoard();
    this.childPointer = 0;
    this.childrenNode = [];
  }

  firstchild(node, player)
  {  //vermutlich hier das possibleMoves(player)
    this.childrenMoves = possibleMoves(player);
    this.childPointer = 0;
    var savedData = commitMove(this.childrenMoves[i], player);
    let newNode = new Node();
    this.childrenNode.push(newNode.id);
    revertMove(savedData);
    return newNode.value;
  }

  nextbrother(node)
  {
    //getNode(node).

    try
    {
      this.childPointer += 1;
      console.log(this.childPointer);
      return this.children[this.childPointer];
    }
    catch(err)
    {
      
    }
    return "NOCHILD"  //never returns
  }

  pushNode(node)
  {
    allNodes.push(node);
  }

  getNode(node)
  {
    return allNodes[node];
  }

  getLowerbound(node)
  {
    getNode(node).lowerband;
  }

  getUpperbound(node)
  {
    return getNode(node).upperband;
  }
}

