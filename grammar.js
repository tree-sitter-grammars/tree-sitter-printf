/**
 * @file Tree-sitter grammar definition
 * @author Peter Stuifzand
 * @license ISC
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

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
      choice(
        seq(optional($.size), $.type),
        // A bare w is a verb; as a size modifier it must have an adjacent type.
        seq(alias('w', $.size), alias(token.immediate(prec(1, /[a-zA-Z]/)), $.type)),
      )
    ),

    // TODO: restrict?
    type: _ => choice(/[a-vx-zA-Z]/, 'w'),

    flags: _ => /[-#0 +'I]/,

    width: _ => /0?[0-9]+|\*/,

    precision: _ => /\.([0-9]*|\*)/,

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
    ))),

    _text: _ => prec(-1, /[^%]+/)
  }
});
