# 2d-graph-visualiser

This project is a simple physics-based javascript 2D-graph-visualiser. It aims to provide an easy way to map undirected graphs onto a 2D plane, while allowing the user to adjust the physical layout of the nodes. It is designed to be mainly used in competitive programming and teaching, in order to help quickly understand sample inputs.

# Details

The whole graph is mapped onto a 2D plane and is subject to several physical forces. All the nodes act as electric charges, are drawn towards the center by an electrostatic force and repel each other through the same type of interaction. Similarly, edges act as springs, clustering connected components together on the plane. 
Each node can be either fixed/freed by clicking and can be dragged across the plane to allow more flexibility.

# How to Use

The project is integrated into a web-page which does not require any additional files.

The graph input is entered manually by the user in the following standard format:
```
N //number of nodes

u1 v1 //first edge
u2 v2 //second edge
...
um vm //m-th edge
```
The number of nodes should be any integer between 1 and 100 (due to space limitations). Nodes are indexed starting from 0.
