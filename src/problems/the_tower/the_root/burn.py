class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BinarySearchTree:
    def __init__(self):
        self.root = None

    def insert(self, value):
        if self.root is None:
            self.root = Node(value)
        else:
            self._insert_recursive(self.root, value)

    def _insert_recursive(self, node, value):
        if value < node.value:
            if node.left is None:
                node.left = Node(value)
            else:
                self._insert_recursive(node.left, value)
        else:
            if node.right is None:
                node.right = Node(value)
            else:
                self._insert_recursive(node.right, value)

# Perform the Burn
# Utility function to print the sequence of burning nodes
def burn_tree_util(root, target, q):
    # Base condition
    if root is None:
        return 0
 
    # Condition to check whether target
    # node is found or not in a tree
    if root.value == target:
        print(root.value)
        if root.left is not None:
            q.append(root.left)
        if root.right is not None:
            q.append(root.right)
 
        # Return statements to prevent
        # further function calls
        return 1
 
    a = burn_tree_util(root.left, target, q)
 
    if a == 1:
        q_size = len(q)
 
        # Run while loop until size of queue
        # becomes zero
        while q_size:
            temp = q[0]
 
            # Printing of burning nodes
            print(temp.value, end=" ")
            del q[0]
 
            # Check if condition for left subtree
            if temp.left is not None:
                q.append(temp.left)
 
            # Check if condition for right subtree
            if temp.right is not None:
                q.append(temp.right)
 
            q_size -= 1
 
        if root.right is not None:
            q.append(root.right)
 
        print(root.value)
 
        # Return statement it prevents further
        # further function call
        return 1
 
    b = burn_tree_util(root.right, target, q)
 
    if b == 1:
        q_size = len(q)
        # Run while loop until size of queue
        # becomes zero
 
        while q_size:
            temp = q[0]
 
            # Printing of burning nodes
            print(temp.value, end=" ")
            del q[0]
 
            # Check if condition for left subtree
            if temp.left is not None:
                q.append(temp.left)
 
            # Check if condition for left subtree
            if temp.right is not None:
                q.append(temp.right)
 
            q_size -= 1
 
        if root.left is not None:
            q.append(root.left)
 
        print(root.value)
 
        # Return statement it prevents further
        # further function call
        return 1
 
# Function will print the sequence of burning nodes
def burn_tree(root, target):
    q = []
 
    # Function call
    burn_tree_util(root, target, q)
 
    # While loop runs unless queue becomes empty
    while q:
        q_size = len(q)
        while q_size:
            temp = q[0]
 
            # Printing of burning nodes
            print(temp.value, end="")
            # Insert left child in a queue, if exist
            if temp.left is not None:
                q.append(temp.left)
            # Insert right child in a queue, if exist
            if temp.right is not None:
                q.append(temp.right)
 
            if len(q) != 1 and q_size != 1:
                print(" ", end="")
 
            del q[0]
            q_size -= 1
        print()

# Read in an array
nums = input().split()
n = int(nums[0])
m = int(nums[1])
array = list(map(int, input().split()))

# Insert each number into the BST
bst = BinarySearchTree()
for num in array:
    bst.insert(num)

# Perform the Burn
burn_tree(bst.root, m)