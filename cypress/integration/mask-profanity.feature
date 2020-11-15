Feature: Profanity remover

  Background:
    Given I set the purgomalum API url variables

  Scenario Outline: As an editor, I want to remove profanity from content

    When I have <profanity> in content
    Then I should have <result> with profanity masked out with asterisk

    Examples:
      | profanity        | result           |
      | arse             | ****             |
      | Dildo            | *****            |
      | cum              | ***              |
      | Dildos           | ******           |
      | arsenal          | arsenal          |
      | He is cumbersome | He is cumbersome |

  Scenario Outline: As an editor, I want to replace profanity fill character

    When I replace default fill character in <profanity> with <fill_char>
    Then I should have <result> with profanity masked out with fill char

    Examples:
      | profanity | fill_char | result                              |
      | arse      | -         | ----                                |
      | Dildo     | =         | =====                               |
      | Dildo     | +         | Invalid User Replacement Characters |

  Scenario Outline: As an editor, I want to replace profanity fill text

    When I replace fill text in <profanity> with <fill_text>
    Then I should have <result> with profanity replaced with fill text

    Examples:
      | profanity   | fill_text | result    |
      | Has arse    | [ ]       | Has [ ]   |
      | Dildo store | { }       | { } store |
      | fag it      | &         | *** it    |
