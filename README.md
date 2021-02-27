# Aegis Sheets node
Read from Google Sheets

## Environment variables
* `PORT`: the port to listen on
* `API_KEY`: the Google API key to use

## Query format
POST to `your-host:port/` with
```yaml
{
  "doc": "[Google Sheets document ID from URL]",
  "sheet": 0, #index of the sheet to read from (0-indexed)
  "range": "A1:B4" #range to read
}
```
The response will be a JSON array-of-arrays representing the range requested

## TODO
* Add ability to write to sheets with service accounts
