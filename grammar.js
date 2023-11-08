/**
 * @file Tree-sitter grammar definition
 * @author Peter Stuifzand
 * @license ISC
 */

module.exports = grammar({
  name: 'printf',

  rules: {
    format_string: $ => repeat(
      choice($._text, $.format, '%%')
    ),

    format: $ => seq(
      '%',
      optional($.flags),
      optional($.width),
      optional($.precision),
      optional($.size),
      $.type
    ),

    // TODO: restrict?
    type: _ => /[a-zA-Z]/,

    flags: _ => /[-#0 +'I]/,

    width: _ => /0?[0-9*]+/,

    precision: _ => /\.[0-9]*/,

    size: _ => token(prec(1, choice(
      'hh',
      'h',
      'l',
      'll',
      'L',
      'j',
      'z',
      't',
      'I',
      'I32',
      'I64',
      'w',
    ))),

    _text: _ => prec(-1, /[^%]+/)
  }
});
