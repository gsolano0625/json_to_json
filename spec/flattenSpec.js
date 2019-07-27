'use static';

const JsonTransformer = require('../index.js');

describe('JsonTransformer', () => {

  it('should flat a json object', () => {

    const input = {
      'item_a': {
        'item_1': {
          'item_1_1': {
            'item_1_1_1': {
              'a_string': 'A leaf value',
              'a_number': 25,
              'a_boolean': true,
              'ignore': 'useless_value'
            }
          }
        }
      }
    };

    const map = {
      'item_a': {
        'item_1': {
          'item_1_1': {
            'item_1_1_1': {
              'a_string': 'name',
              'a_number': 'id',
              'a_boolean': 'active'
            }
          }
        }
      }
    };

    const transformer = new JsonTransformer(map, input);
    const { output } = transformer.transform();

    expect(output).toEqual({
      'name': 'A leaf value',
      'id': 25,
      'active': true
    });

  });


});
