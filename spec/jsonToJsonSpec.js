'use static';

const JsonTransformer = require('../index.js');

describe('JsonTransformer', () => {

  it('should mapsTo functions work for complex rules ', () => {

    const input = {
      "request": {
        "reference": {
          "consumerReference": [
            {
              "category": 2,
              "key": "D822100"
            }
          ]
        }
      }
    }

    const map = {
      request: {
        reference: {
          consumerReference: {
            isArray: true,
            idx: 0,
            mapsTo: (value, output) => {
              switch (value.category) {
                case 2:
                  output["category"] = value.key;
                  break;
                case 3:
                  output["type"] = value.key;
                  break;
                case 6:
                  output["id"] = value.key;
                  break;
              }
            }
          }
        }
      }
    }

    const transformer = new JsonTransformer(map, input);
    const output = transformer.transform().output;

    expect(output).toEqual({
      category: "D822100",
    })

  });


});