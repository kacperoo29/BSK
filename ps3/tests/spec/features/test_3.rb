
# spec/features/mytest_spec.rb

RSpec.describe "MatrixShifyEncryptionOptionB" do
    before do
      @session = Capybara::Session.new(:selenium_headless)
      @session.visit("localhost:5000")
    end
    context "encoding and decoding with key CONVENIENCE" do
        let(:normal_string) { "HERE IS A SECRET MESSAGE ENCIPHERED BY TRANSPOSITION" }
        let(:key) { "CONVENIENCE" }
        let(:encoded_string) { "HECRN CEYI ISEP SGDI RNTO AAES RMPN SSRO EEBT ETIA EEHS " }
        let(:algorithm_option) { "Przestawienie macierzowe 2b" }
        
        context "when writing HERE IS A SECRET MESSAGE ENCIPHERED BY TRANSPOSITION with key CONVENIENCE" do
            it "should output encoded cipher HECRN CEYI ISEP SGDI RNTO AAES RMPN SSRO EEBT ETIA EEHS " do
                @session.select algorithm_option, from: "algorithm"

                @session.fill_in 'input', with: normal_string
                @session.fill_in 'key', with: key
                @session.click_button 'Encode'
                value = @session.find_by_id("output").value

                expect(value).to eq(encoded_string)
            end
        end
        context "when writing HECRN CEYI ISEP SGDI RNTO AAES RMPN SSRO EEBT ETIA EEHS with key CONVENIENCE" do
            it "should output decoded cipher HERE IS A SECRET MESSAGE ENCIPHERED BY TRANSPOSITION without spaces" do
                    @session.select algorithm_option, from: "algorithm"
                    
                    @session.fill_in 'input', with: encoded_string
                    @session.fill_in 'key', with: key
                    @session.click_button 'Decode'
                    value = @session.find_by_id("output").value

                    expect(value).to eq(normal_string.gsub(" ", ""))
            end
        end
    end
    context "encoding and decoding with key RICKASTLEY" do
        let(:normal_string) { "Never gonna give you up never gonna let you down" }
        let(:key) { "RICKASTLEY" }
        let(:encoded_string) { "rygu vvey npan eivt eero nunw Ngee good ouno anl " }
        let(:algorithm_option) { "Przestawienie macierzowe 2b" }
        
        context "when writing HERE IS A SECRET MESSAGE ENCIPHERED BY TRANSPOSITION with key CONVENIENCE" do
            it "should output encoded cipher 'rygu vvey npan eivt eero nunw Ngee good ouno anl ' " do
                @session.select algorithm_option, from: "algorithm"

                @session.fill_in 'input', with: normal_string
                @session.fill_in 'key', with: key
                @session.click_button 'Encode'
                value = @session.find_by_id("output").value

                expect(value).to eq(encoded_string)
            end
        end
        context "when writing HECRN CEYI ISEP SGDI RNTO AAES RMPN SSRO EEBT ETIA EEHS with key CONVENIENCE" do
            it "should output decoded cipher 'rygu vvey npan eivt eero nunw Ngee good ouno anl ' without spaces" do
                    @session.select algorithm_option, from: "algorithm"
                    
                    @session.fill_in 'input', with: encoded_string
                    @session.fill_in 'key', with: key
                    @session.click_button 'Decode'
                    value = @session.find_by_id("output").value

                    expect(value).to eq(normal_string.gsub(" ", ""))
            end
        end
    end
end