const React = require('react');
const Foo = require('Foo');

/**
 * General component description. Tag 1 is a string description. Tag 2 is a boolean since it
 * has no text on the same line.
 * @Tag1 This is a basic tag description
 * @Tag2
 *
 */
const Component = React.createClass({
  displayName: 'Component',

  propTypes: {
    ...Foo.propTypes,
    /**
     * Appearance: Prop description. This prop will have create control set to true
     * since it has the string "Appearance:"
     * @Option1 This tag will appear under fields for this prop
     * @Option2
     */
    bar: React.PropTypes.number,
  },

  getDefaultProps: function() {
    return {
      bar: 21,
    };
  },

  render: function() {
    // ...
  },
});

module.exports = Component;
