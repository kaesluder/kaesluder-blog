---js
const title = '24 May 2025, rswag and Murderbot';
const date = "2025-05-24";
const draft = false;
const tags = ["ruby", "tv"];
---

### rswag

Programming: Created a self-documenting API endpoint using
[rswag](https://github.com/rswag/rswag).

1. Optional: Define json schema for responses.

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "valid": { "type": "boolean", "enum": [true] },
    "message": { "type": "string", "enum": ["Valid working name"] }
  },
  "required": ["valid", "message"]
}
```

2. Use rswag and rspec DSLs to define interactions. The `check_working_name`
   endpoint takes a single parameter `working_name` and returns a valid or
   invalid status.

```ruby
# incomplete code example
path '/api/check_working_name' do
   existing_working_name = "this exists in database"
   new_working_name = "this does not exist in database"

   # add a new :data_object to the database.
   let!(:data_object1) { create(:data_object, working_name: existing_working_name) }
   parameter name: :working_name, in: :query, type: :string,
    required: true, description: 'Working name to validate'

   get('check_working_name lookup') do
     tags 'Lookup'
     produces 'application/json'

     response(200, 'Valid Working name') do
       let(:working_name) { new_working_name }
       contract_schema 'lookups/check_working_name_valid'
       run_test!
     end
   end
end
```

3. Create swagger documentation.

```sh
bundle exec rake rswag:specs:swaggerize
```

## Murderbot

_Murderbot_ is the AppleTV adaptation of _The Murderbot Diaries_ by Martha
Wells. The series centers on _Murderbot_ a cyborg Security Unit who develops
human relationships and passes for human. Unlike most robot stories, Murderbot
has no desire to become human, just be accepted on its own terms. The book
series may not have started using Murderbot as a metaphor for neurodivergence,
but that framing has been accepted by the author and incorporated into the
screenplay for the TV adaptation.

Parallel to this, there's been
[new research](https://media.ed.ac.uk/media/DiSI+Animation+2.0/1_62bchtwd) on
the double empathy problem of autism. The double empathy problem suggests that
for low-needs autistic people, difficulties in communication come primarily from
differences in communication style rather than social deficits. Anecdotal
evidence and limited studies find that autistic people communicate with high
accuracy with other autistic people, but communication in mixed
autistic/non-autistic is worse than in homogeneous groups.

Most of the comedy in Murderbot comes from differences in communication styles.
Murderbot visual sees the world through multiple cameras, the humans around it
want face-to-face communication and eye contact. The human characters
communicate care and consensus through physical touch, Murderbot prefers to
stand in a corner. The humans thrive by communicating emotions, Murderbot
processes massive amounts of data that can't be expressed in human terms.

These ideas may be exaggerated compared to ND/NT differences, but many people
find them to be relatable.
