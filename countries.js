const countriesArray = {

    "Afghanistan": "AF",

    "Albania": "AL",

    "Algeria": "DZ",

    "American Samoa": "AS",

    "Andorra": "AD",

    "Angola": "AO",

    "Anguilla": "AI",

    "Antarctica": "AQ",

    "Antigua and Barbuda": "AG",

    "Argentina": "AR",

    "Armenia": "AM",

    "Aruba": "AW",

    "Australia": "AU",

    "Austria": "AT",

    "Azerbaijan": "AZ",

    "Bahamas": "BS",

    "Bahrain": "BH",

    "Bangladesh": "BD",

    "Barbados": "BB",

    "Belarus": "BY",

    "Belgium": "BE",

    "Belize": "BZ",

    "Benin": "BJ",

    "Bermuda": "BM",

    "Bhutan": "BT",

    "Bolivia": "BO",

    "Bosnia and Herzegovina": "BA",

    "Botswana": "BW",

    "Bouvet Island": "BV",

    "Brazil": "BR",

    "British Indian Ocean Territory": "IO",

    "Brunei Darussalam": "BN",

    "Bulgaria": "BG",

    "Burkina Faso": "BF",

    "Burundi": "BI",

    "Cambodia": "KH",

    "Cameroon": "CM",

    "Canada": "CA",

    "Cape Verde": "CV",

    "Cayman Islands": "KY",

    "Central African Republic": "CF",

    "Chad": "TD",

    "Chile": "CL",

    "China": "CN",

    "Christmas Island": "CX",

    "Cocos (Keeling) Islands": "CC",

    "Colombia": "CO",

    "Comoros": "KM",

    "Republic of the Congo": "CG",

    "Democratic Republic of the Congo": "CD",

    "Cook Islands": "CK",

    "Costa Rica": "CR",

    "Ivory Coast": "CI",

    "Croatia": "HR",

    "Cuba": "CU",

    "Cyprus": "CY",

    "Czechia": "CZ",

    "Denmark": "DK",

    "Djibouti": "DJ",

    "Dominica": "DM",

    "Dominican Republic": "DO",

    "Ecuador": "EC",

    "Egypt": "EG",

    "El Salvador": "SV",

    "Equatorial Guinea": "GQ",

    "Eritrea": "ER",

    "Estonia": "EE",

    "Ethiopia": "ET",

    "Falkland Islands (Malvinas)": "FK",

    "Faroe Islands": "FO",

    "Fiji": "FJ",

    "Finland": "FI",

    "France": "FR",

    "French Guiana": "GF",

    "French Polynesia": "PF",

    "French Southern Territories": "TF",

    "Gabon": "GA",

    "The Gambia": "GM",

    "Georgia": "GE",

    "Germany": "DE",

    "Ghana": "GH",

    "Gibraltar": "GI",

    "Greece": "GR",

    "Greenland": "GL",

    "Grenada": "GD",

    "Guadeloupe": "GP",

    "Guam": "GU",

    "Guatemala": "GT",

    "Guinea": "GN",

    "Guinea-Bissau": "GW",

    "Guyana": "GY",

    "Haiti": "HT",

    "Heard Island and McDonald Islands": "HM",

    "Vatican City": "VA",

    "Honduras": "HN",

    "Hong Kong": "HK",

    "Hungary": "HU",

    "Iceland": "IS",

    "India": "IN",

    "Indonesia": "ID",

    "Iran": "IR",

    "Iraq": "IQ",

    "Ireland": "IE",

    "Israel": "IL",

    "Italy": "IT",

    "Jamaica": "JM",

    "Japan": "JP",

    "Jordan": "JO",

    "Kazakhstan": "KZ",

    "Kenya": "KE",

    "Kiribati": "KI",

    "North Korea": "KP",

    "South Korea": "KR",

    "Kuwait": "KW",

    "Kyrgyzstan": "KG",

    "Lao People's Democratic Republic": "LA",

    "Latvia": "LV",

    "Lebanon": "LB",

    "Lesotho": "LS",

    "Liberia": "LR",

    "Libya": "LY",

    "Liechtenstein": "LI",

    "Lithuania": "LT",

    "Luxembourg": "LU",

    "Macao": "MO",

    "Madagascar": "MG",

    "Malawi": "MW",

    "Malaysia": "MY",

    "Maldives": "MV",

    "Mali": "ML",

    "Malta": "MT",

    "Marshall Islands": "MH",

    "Martinique": "MQ",

    "Mauritania": "MR",

    "Mauritius": "MU",

    "Mayotte": "YT",

    "Mexico": "MX",

    "Micronesia, Federated States of": "FM",

    "Moldova, Republic of": "MD",

    "Monaco": "MC",

    "Mongolia": "MN",

    "Montserrat": "MS",

    "Morocco": "MA",

    "Mozambique": "MZ",

    "Myanmar": "MM",

    "Namibia": "NA",

    "Nauru": "NR",

    "Nepal": "NP",

    "Netherlands": "NL",

    "New Caledonia": "NC",

    "New Zealand": "NZ",

    "Nicaragua": "NI",

    "Niger": "NE",

    "Nigeria": "NG",

    "Niue": "NU",

    "Norfolk Island": "NF",

    "North Macedonia": "MK",

    "Northern Mariana Islands": "MP",

    "Norway": "NO",

    "Oman": "OM",

    "Pakistan": "PK",

    "Palau": "PW",

    "Palestine": "PS",

    "Panama": "PA",

    "Papua New Guinea": "PG",

    "Paraguay": "PY",

    "Peru": "PE",

    "Philippines": "PH",

    "Pitcairn Islands": "PN",

    "Poland": "PL",

    "Portugal": "PT",

    "Puerto Rico": "PR",

    "Qatar": "QA",

    "Reunion": "RE",

    "Romania": "RO",

    "Russia": "RU",

    "Rwanda": "RW",

    "Saint Helena": "SH",

    "Saint Kitts and Nevis": "KN",

    "Saint Lucia": "LC",

    "Saint Pierre and Miquelon": "PM",

    "Saint Vincent and the Grenadines": "VC",

    "Samoa": "WS",

    "San Marino": "SM",

    "Sao Tome and Principe": "ST",

    "Saudi Arabia": "SA",

    "Senegal": "SN",

    "Seychelles": "SC",

    "Sierra Leone": "SL",

    "Singapore": "SG",

    "Slovakia": "SK",

    "Slovenia": "SI",

    "Solomon Islands": "SB",

    "Somalia": "SO",

    "South Africa": "ZA",

    "South Georgia and the South Sandwich Islands": "GS",

    "Spain": "ES",

    "Sri Lanka": "LK",

    "Sudan": "SD",

    "Suriname": "SR",

    "Svalbard and Jan Mayen": "SJ",

    "Eswatini": "SZ",

    "Sweden": "SE",

    "Switzerland": "CH",

    "Syrian Arab Republic": "SY",

    "Taiwan": "TW",

    "Tajikistan": "TJ",

    "Tanzania": "TZ",

    "Thailand": "TH",

    "Timor-Leste": "TL",

    "Togo": "TG",

    "Tokelau": "TK",

    "Tonga": "TO",

    "Trinidad and Tobago": "TT",

    "Tunisia": "TN",

    "Turkey": "TR",

    "Turkmenistan": "TM",

    "Turks and Caicos Islands": "TC",

    "Tuvalu": "TV",

    "Uganda": "UG",

    "Ukraine": "UA",

    "United Arab Emirates": "AE",

    "United Kingdom": "GB",

    "United States": "US",

    "United States Minor Outlying Islands": "UM",

    "Uruguay": "UY",

    "Uzbekistan": "UZ",

    "Vanuatu": "VU",

    "Venezuela": "VE",

    "Vietnam": "VN",

    "Virgin Islands, British": "VG",

    "Virgin Islands, U.S.": "VI",

    "Wallis and Futuna": "WF",

    "Western Sahara": "EH",

    "Yemen": "YE",

    "Zambia": "ZM",

    "Zimbabwe": "ZW",

    "Aland Islands": "AX",

    "Bonaire, Sint Eustatius and Saba": "BQ",

    "Curaçao": "CW",

    "Guernsey": "GG",

    "Isle of Man": "IM",

    "Jersey": "JE",

    "Montenegro": "ME",

    "Saint Barthélemy": "BL",

    "Saint Martin": "MF",

    "Serbia": "RS",

    "Sint Maarten": "SX",

    "South Sudan": "SS",

    "Kosovo": "XK"

};