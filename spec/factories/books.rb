FactoryBot.define do
  factory :book do
    title { "MyString" }
    author { "MyString" }
    description { "MyText" }
    date_added { "2025-06-24 22:52:03" }
    notes { "MyText" }
    status { "MyString" }
    category { nil }
  end
end
