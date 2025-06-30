FactoryBot.define do
  factory :comment do
    comment_text { "MyText" }
    date { "2025-06-24 22:52:03" }
    book { nil }
    user { nil }
  end
end
