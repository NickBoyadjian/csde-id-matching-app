# Csde Matching App
I built this application for the Center for Social Development and Education. The app was built to match schools in the CSDE dataset with their respective government records in order to build more rich data sets.

## Development process
I initially started by writting a simple node.js script that read the appropriate csv files from disk and produced a new csv with the updated data. I used string similarity algorithms to match the school names in the data sets. I found various idiosyncrasies in the naming conventions in order to write a name cleaning function that normalized all the school names, allowing the best results from the matching algorithm.

Having to work with such large amounts of data, I needed to make changes to the code in order to get the processing time down to a minimum. I used hashmaps that pointed to smaller arrays of subsets of schools in order to avoid processing the entire list on every iteration.

## Final deliverable
To make this program as easy to use as possible, I built a desktop application with Electron that the CSDE could use to run the program from their own computers.
