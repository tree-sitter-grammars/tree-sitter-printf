package tree_sitter_printf_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_printf "github.com/tree-sitter-grammars/tree-sitter-printf/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_printf.Language())
	if language == nil {
		t.Errorf("Error loading printf grammar")
	}
}
