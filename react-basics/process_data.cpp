#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>
#include <cmath>
#include <cmath>

#ifndef M_PI
#define M_PI 3.14159265358979323846
#endif
#include "json.hpp"
 // install from https://github.com/nlohmann/json

// Star struct
struct Star {
    double x, y, z;
    double magnitude;
};

// Convert celestial coordinates (RA, Dec) to Cartesian
Star celestialToCartesian(double rightAscension, double declination, double distance) {
    Star star;
    double ra_rad = rightAscension * M_PI / 180.0;
    double dec_rad = declination * M_PI / 180.0;
    star.x = distance * cos(dec_rad) * cos(ra_rad);
    star.y = distance * cos(dec_rad) * sin(ra_rad);
    star.z = distance * sin(dec_rad);
    return star;
}

int main() {
    std::ifstream inFile("raw_star_data.csv");
    if (!inFile.is_open()) {
        std::cerr << "Error: raw_star_data.csv not found!" << std::endl;
        return 1;
    }

    nlohmann::json jsonArray = nlohmann::json::array();
    std::string line;
    std::getline(inFile, line); // skip header

    while (std::getline(inFile, line)) {
        std::stringstream ss(line);
        std::string token;
        std::vector<std::string> tokens;
        while (std::getline(ss, token, ',')) {
            tokens.push_back(token);
        }

        if (tokens.size() < 3) continue; // skip bad lines

        double ra = std::stod(tokens[0]);
        double dec = std::stod(tokens[1]);
        double mag = std::stod(tokens[2]);

        Star star = celestialToCartesian(ra, dec, 1.0); // distance=1.0 sphere

        nlohmann::json starObject;
        starObject["x"] = star.x;
        starObject["y"] = star.y;
        starObject["z"] = star.z;
        starObject["magnitude"] = mag;

        jsonArray.push_back(starObject);
    }

    std::ofstream outFile("stars.json");
    if (outFile.is_open()) {
        outFile << jsonArray.dump(4);
        outFile.close();
        std::cout << "✅ Successfully generated stars.json" << std::endl;
    } else {
        std::cerr << "Error writing to stars.json" << std::endl;
    }

    return 0;
}
