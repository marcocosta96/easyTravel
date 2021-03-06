Feature: User can set an avatar
  As a registered user
  So that I can show an image representing me
  I want to set an avatar

Scenario: Add an avatar
  Given I am a registered user
  When I log in
  And I follow "Profilo"
  And I attach the file "features/support/test-image.jpg" to "Avatar"
  And I fill in "user[current_password]" with "123456"
  And I press "Aggiorna"
  Then I should be on the home page
  And I should see my avatar
