let allNodes = [];

class Node {

  constructor ()
  { 
    this.id = allNodes++;
  }

  firstchild(node, player)
  {  //vermutlich hier das possibleMoves(player)
    this.children = possibleMoves(player);
    return this.children[0];
  }

  nextbrother(node)
  {
    //getNode(node).

    try
    {
      this.childPointer += 1;
      return this.children[this.childPointer];
    }
    catch(err)
    {
      
    }
    return "NOCHILD"
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
