import requests
import json
import re

GITHUB_REPO = "rennygaydewitch/rennygadereportingsystem"

def get_issues():
    """Fetch issues from the GitHub repository."""
    url = f"https://api.github.com/repos/{GITHUB_REPO}/issues"
    headers = {
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "my-python-client"
    }
    response = requests.get(url, headers=headers)
    print(f"Response Status Code: {response.status_code}")
    if response.status_code != 200:
        print(f"Error Message: {response.text}")
        raise Exception(f"Error fetching issues: {response.status_code}")

    all_issues = response.json()
    print("Fetched Issues:", json.dumps(all_issues, indent=2))

    approved_issues = [
        issue for issue in all_issues if any(label["name"].lower() == "approved" for label in issue.get("labels", []))
    ]

    return approved_issues

def parse_issue(issue):
    """Parse the latitude, longitude, base name, and description from an issue."""
    body = issue.get("body", "")

    print("Issue Body:", body)

    lat_match = re.search(r"Latitude:\s*([\d\.\-]+)", body, re.IGNORECASE)
    lon_match = re.search(r"Longitude:\s*([\d\.\-]+)", body, re.IGNORECASE)
    name_match = re.search(r"Base Name:\s*(.*)", body, re.IGNORECASE)
    description_match = re.search(r"Description:\s*(.*)", body, re.IGNORECASE)

    if lat_match and lon_match and name_match:
        latitude = lat_match.group(1)
        longitude = lon_match.group(1)
        base_name = name_match.group(1).strip()
        description = description_match.group(1).strip() if description_match else "No Description"

        print(f"Parsed Data: Latitude={latitude}, Longitude={longitude}, Base Name={base_name}, Description={description}")
        return latitude, longitude, base_name, description
    else:
        print("No matching data found in issue.")
        return None

def convert_to_json_format(latitude, longitude, base_name, description):
    """Convert data to the required JSON format."""
    coordinates = f"{longitude},{latitude},0"
    info = f"Description: {description}, Coordinates: {coordinates}"
    return {
        "name": base_name,
        "info": info
    }

def main():
    issues = get_issues()
    json_data = []

    for issue in issues:
        parsed_data = parse_issue(issue)
        if parsed_data:
            latitude, longitude, base_name, description = parsed_data
            json_entry = convert_to_json_format(latitude, longitude, base_name, description)
            json_data.append(json_entry)

    output_filename = "issues_output.json"
    with open(output_filename, "w") as json_file:
        json.dump(json_data, json_file, indent=4)

    print(f"JSON data has been written to {output_filename}")

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"An error occurred: {e}")
