# PakageDelivery
This project is just prototype for demonstration idea only

## Description
In one working day, there's a lot of orders.
Each order is a job contain 2 tasks : **Pick up** and **Delivery**.
All system job would be in 1 queue, and operator/system could randomly assign job to drivers
So when driver was assigned a job, it will be split in 2 task => 2 task need to be complete to finish a single order
At the same time, driver could process many order => application must arrange routes between many tasks logically to optimize perfomance for driver

At a point a time, when having task processing, application show maps and direction from current position to task's destination 
=> when driver finish current task, map continuously updated route to next task

## Data generate
All data is generated by google api
From a position, randomly getting 20 address near by with radius 4km
=> with 20 address, randomly generate 20 jobs with a pair of tasks **Pick up** and **Delivery**
=> processing 2 jobs, push 4 task in assingment


## Setup
This project using typescript instead of JS => please, install Typescript before continue proceeding
In terminal, type:
* Npm install
* tsc
* react-native run-ios

