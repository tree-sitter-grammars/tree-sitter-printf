import XCTest
import SwiftTreeSitter
import TreeSitterPrintf

final class TreeSitterPrintfTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_printf())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading printf format grammar")
    }
}
