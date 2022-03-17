
# spec/features/mytest_spec.rb

RSpec.describe "MatrixShifyEncryptionOptionA" do
    before do
        @session = Capybara::Session.new(:selenium_headless)
        @session.visit("localhost:5000")
    end
    context "decoding and encoding CRYPTOGRAPHYOSA with key 3-1-4-2" do
        let(:normal_string) { "CRYPTOGRAPHYOSA" }
        let(:key) { "3-1-4-2" }
        let(:encoded_string) { "YCPRGTROHAYPAOS" }
        let(:algorithm_option) { "Przestawienie macierzowe 2a" }

        context "when writing CRYPTOGRAPHYOSA with key 3-1-4-2" do
            it "should output encoded cipher YCPRGTROHAYPAOS" do
                @session.select algorithm_option, from: "algorithm"

                @session.fill_in 'input', with: normal_string
                @session.fill_in 'key', with: key
                @session.click_button 'Encode'
                value = @session.find_by_id("output").value

                expect(value).to eq(encoded_string)
            end
        end
        context "when writing YCPRGTROHAYPAOS with key 3-1-4-2" do
            it "should output decoded cipher CRYPTOGRAPHYOSA" do
                    @session.select algorithm_option, from: "algorithm"
                    @session.fill_in 'input', with: encoded_string
                    @session.fill_in 'key', with: key
                    @session.click_button 'Decode'
                    value = @session.find_by_id("output").value

                    expect(value).to eq(normal_string)
            end
        end
    end

    context "decoding and encoding with-key 3-1-2-6-5-4" do
        let(:normal_string) { "Never gonna give you up never gonna let you down" }
        let(:key) { "3-1-2-6-5-4" }
        let(:encoded_string) { "vNe rengo anvgiy e ou puvne rengo antleoy du nwo" }
        let(:algorithm_option) { "Przestawienie macierzowe 2a" }

        context "when writing 'Never gonna give you up never gonna let you down' with key 3-1-2-6-5-4" do
            it "should output encoded cipher 'vNe rengo anvgiy e ou puvne rengo antleoy du nwo'" do
                @session.select algorithm_option, from: "algorithm"

                @session.fill_in 'input', with: normal_string
                @session.fill_in 'key', with: key
                @session.click_button 'Encode'
                value = @session.find_by_id("output").value

                expect(value).to eq(encoded_string)
            end
        end
        context "when writing 'vNe rengo anvgiy e ou puvne rengo antleoy du nwo' with key 3-1-2-6-5-4" do
            it "should output decoded cipher 'Never gonna give you up never gonna let you down'" do
                    @session.select algorithm_option, from: "algorithm"
                    @session.fill_in 'input', with: encoded_string
                    @session.fill_in 'key', with: key
                    @session.click_button 'Decode'
                    value = @session.find_by_id("output").value

                    expect(value).to eq(normal_string)
            end
        end
    end
end