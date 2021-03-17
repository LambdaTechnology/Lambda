//
// Created by seymo on 3/15/2021.
//
#include "lib.h"

const char* convert(const std::string& t)
{
	return t.c_str();
}

std::string stream;

int main(int argc, char** argv)
{
	
	if (argc > 1)
	{
		stream = argv[1];
		if (stream == "--help" || stream == "--h")
		{
			std::cout << "List of available commands as of " << __TIME__ << "\n"
			                                                                "-load          Loads a file using the LambdaC Interpreter." << std::endl;
		}
		else if (stream == "-c" || stream == "-load")
		{
			if (argc > 2)
				std::cout << "Missing <file> Argument." << std::endl;
			else
			{
				std::cout << "Loading File. . ." << std::endl;
			}
		}
	}
	else {
		printf("No arguments specified.\n");
	}
}