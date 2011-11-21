# 3D Explorer
## Introduction

This demo shows how to use one device (equipped with an accelerometer) to explore in 3 dimensions an object shown on the screen of another device, using only off-the-shelf Web technologies.

## Instructions

* Load the 3D object (html5logo.html) on a given device, typically a regular computer browser
* Load the 3D-explorer (3D.html) page on a device with an accelerometer and a browser supporting the accelerometer API (e.g. iPhone > 4, iPad, Firefox on Android, Android browser > 3.0)
* Move the second device and see how the object is animated on the first screen in sync

This code [can be used live](http://strong-summer-2638.herokuapp.com/) and can be seen [recorded in video](http://www.w3.org/2011/11/3d-demo.html).

##  Under the hood

The movements of the second device are captured using W3C DeviceOrientation Events, sent to a proxy server built using node.js, and then dispatched to the first device via Server-Sent events.

The HTML5 3D logo is built using HTML5’s canvas element.

The HTML5 3D logo animation itself comes from Kevin Roast’s 3D demos, using the canvas K3D library.