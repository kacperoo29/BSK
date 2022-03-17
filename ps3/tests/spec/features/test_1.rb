
RSpec.describe "RailFence" do
  before do
    @session = Capybara::Session.new(:selenium_headless)
    @session.visit("localhost:5000")
  end
  context "encoding and decoding with key 3" do
    let(:normal_string) { "CRYPTOGRAPHY" }
    let(:key) { "3" }
    let(:encoded_string) { "CTARPORPYYGH" }

    context "when writing CRYPTOGRAPHY with key 3" do
      it "should output encoded cipher CTARPORPYYGH" do
        @session.fill_in 'input', with: normal_string
        @session.fill_in 'key', with: key
        @session.click_button 'Encode'
        value = @session.find_by_id("output").value

        expect(value).to eq(encoded_string)
      end
    end
    context "when writing CTARPORPYYGH with key 3" do
      it "should output decoded cipher CRYPTOGRAPHY" do
        @session.fill_in 'input', with: encoded_string
        @session.fill_in 'key', with: key
        @session.click_button 'Decode'
        value = @session.find_by_id("output").value

        expect(value).to eq(normal_string)
      end
    end
  end
  context "encoding and decoding with key 7" do

    context "encoding and decoding 'Never gonna give you up never gonna let you down' with key 3" do
      let(:normal_string) { "Never gonna give you up never gonna let you down" }
      let(:key) { "7" }
      let(:encoded_string) { "Ngnle i e envavpvatweneuen orn  rnyd oyu oo gogu" }

      context "when writing 'Never gonna give you up never gonna let you down' with key 7" do
        it "should output encoded cipher 'Ngnle i e envavpvatweneuen orn  rnyd oyu oo gogu'" do
          @session.fill_in 'input', with: normal_string
          @session.fill_in 'key', with: key
          @session.click_button 'Encode'
          value = @session.find_by_id("output").value

          expect(value).to eq(encoded_string)
        end
      end
      context "when writing 'Ngnle i e envavpvatweneuen orn  rnyd oyu oo gogu' with key 7" do
        it "should output decoded cipher 'Never gonna give you up never gonna let you down'" do
          @session.fill_in 'input', with: encoded_string
          @session.fill_in 'key', with: key
          @session.click_button 'Decode'
          value = @session.find_by_id("output").value

          expect(value).to eq(normal_string)
        end
      end
    end
  end
end