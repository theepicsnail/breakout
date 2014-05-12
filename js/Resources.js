/*global define*/
"use strict";

/*
 * Resources.js stores the gate image file, and is responsible for creating the
 * Kinetic.Image objects that are used by gates.
 */
define(["Kinetic", "UID"], function (K, UID) {

  /*
   * Called during loading. The provided callback points to the next step of the
   * loading process and should be called once the image has been loaded and
   * parsed.
   */
  function loadResources(callback) {
    // No resources need loaded
    callback();
  }

  /*
   * public exports
   */
  return {
    load: loadResources,
  };
});
