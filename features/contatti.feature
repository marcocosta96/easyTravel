Feature: User can contact developers
	As a registered user
	So that I can have an information
	I want to contact developers

Scenario: Contact developers
	Given I am a registered user
	When I log in
	And I am on the home page
	When I follow "Contatti"
	And I click on "logo_email"
	Then I should be on the mail page