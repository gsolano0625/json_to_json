'use strict';

class JsonTransformer {

  constructor (config, input) {
    this.config = config;
    this.input = input;
    this.output = {};
  }

  reset () {
    this.output = {};
    return this;
  }

  transform (config, input, output) {
    config = config || this.config;
    input = input || this.input;
    output = output || this.output;

    for (let key in config) {
      if (key === "mapsTo") {
        continue;
      }

      let rule = config[key];
      let value = input[key];

      // if it is not in the input we get to the next one
      if (typeof value !== 'boolean' && !value) {
        continue;
      }

      if (typeof rule === 'string') {
        output[rule] = input[key];
      }

      // It is just parent/container
      else if (!rule.mapsTo && !rule.isArray) {
        this.transform(rule, value, output);
      }

      // mapsTo or isArray
      else {

        // maps to an array
        if (rule.isArray) {

          // Use undefined cause 0 could results as false
          if (typeof rule.idx !== 'undefined') {
            if (typeof rule.mapsTo === 'function') {
              rule.mapsTo(value[rule.idx], output);
            }
            else if (Array.isArray(rule.idx)) {
              // Choose ndx for the index to avoid confusion
              for (let ndx = 0; ndx < rule.idx.length; ndx++) {
                if (value[rule.idx[ndx].idx]) {
                  output[rule.idx[ndx].mapsTo] = value[rule.idx[ndx].idx][rule.idx[ndx].value];
                }
              }
            }
            // idx refers to a specific item on the array, must of the time is the first item
            else if (typeof rule.value === 'string') {
              output[rule.mapsTo] = value[rule.idx][rule.value];
            }
            else if (typeof rule.value === 'undefined') {
              output[rule.mapsTo] = value[rule.idx];
            }
            else if (value[rule.idx]) {
              this.transform(rule.value, value[rule.idx], output);
            }

          }
          else if (typeof rule.mapsTo === 'function') {
            rule.mapsTo(value, output);
          }
          else if (rule.items) {
            output[rule.mapsTo] = [];

            // Loop for all the items in the input
            for (let itemIdx = 0; itemIdx < value.length; itemIdx++) {
              let itemOutput = {};
              output[rule.mapsTo].push(itemOutput);
              this.transform(rule.items, value[itemIdx], itemOutput);
            }
          }
        }

        // mapsTo
        else if (typeof rule.mapsTo === 'function') {
          rule.mapsTo(value, output);
        }
        else {
          output[rule.mapsTo] = {};
          this.transform(rule, value, output[rule.mapsTo]);
        }
      }
    }

    return this;
  }

}

module.exports = JsonTransformer;
