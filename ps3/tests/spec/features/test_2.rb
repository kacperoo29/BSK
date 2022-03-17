
# spec/features/mytest_spec.rb

RSpec.describe "Mytest" do
    before do
      @session = Capybara::Session.new(:selenium_headless)
      @session.visit("localhost:5000")
    end
    context "railFence" do
        let(:normal_string) { "CRYPTOGRAPHYOSA" }
        let(:key) { "3-1-4-2" }
        let(:encoded_string) { "YCPRGTROHAYPAOS" }
        context "when writing CRYPTOGRAPHYOSA with key 3-1-4-2" do
            it "should output encoded cipher YCPRGTROHAYPAOS" do
                @session.select "Przestawienie macierzowe 2a", from: "algorithm"

                @session.fill_in 'input', with: normal_string
                @session.fill_in 'key', with: key
                @session.click_button 'Encode'
                value = @session.find_by_id("output").value

                expect(value).to eq(encoded_string)
            end
        end
        context "when writing YCPRGTROHAYPAOS with key 3-1-4-2" do
            it "should output decoded cipher CRYPTOGRAPHYOSA" do
                    @session.select "Przestawienie macierzowe 2a", from: "algorithm"
                    @session.fill_in 'input', with: encoded_string
                    @session.fill_in 'key', with: key
                    @session.click_button 'Decode'
                    value = @session.find_by_id("output").value

                    expect(value).to eq(normal_string)
            end
        end
    end
end