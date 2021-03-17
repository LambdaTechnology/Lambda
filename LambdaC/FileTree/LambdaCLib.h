//
// LambdaTokenizer

// This Product is licensed under the GNU GPL License.
// You should have received a copy of the license when downloading LambdaC.
//
// Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
// Everyone is permitted to copy and distribute verbatim copies
// of this license document, but changing it is not allowed.
//


#ifndef LAMBDA_LAMBDACLIB_H
#define LAMBDA_LAMBDACLIB_H

#include <cstring>
#include "../lib.h"

class LC_Lib
{

public:
	std::string names;
	
	LC_Lib()
	= default;
	
	explicit LC_Lib(const std::string& name)
	{
		names = name;
	}
	
	/* Gets a Instance of your class. Returns True if the given declaration (expression) Begins with your class. */
	bool GetInstance(const std::string& expression) const
	{
		return std::strstr(expression.c_str(), names.c_str());
	}
	
	/* Returns the ChildFunction's name (MyClass.print() = print) */
	std::string ReturnChildFunction(const std::string& expression) const
	{
		std::string classCall = expression.substr(0,
				expression.find('.')); // Get Class Declaration (System.printf() etc . . .)
		if (classCall == names)
		{
			std::string func_b = expression.substr(expression.find('.') + 1, expression.find('('));
			std::string func = func_b.substr(0, func_b.find('('));
			return func;
		}
		else
			return "Error: Could not find CLASS In Expression.";
	}
	/* Returns a function's subparameters using the same algorithm as @ReturnChildFunction. Guaranteed due to the eraser which erases
	 * function whitespaces & ')'
	 */
	std::string ReturnChildFuncParams(const std::string& expr) const
	{
		std::string classcall = expr.substr(0, expr.find('.'));
		if (classcall == names)
		{
			std::string funcParams = expr.substr(expr.find('(') + 1, expr.find(')')-1);
			funcParams.erase(std::remove(funcParams.begin(), funcParams.end(), ')'), funcParams.end());
			
			return funcParams;
		}
		else
			return "Error: Invalid class call. Unexpected token near (expr) Expression. Did you mean " + names + "?";
	}
};

/* Error Enum is a specific error type. Used to identify specific variables by their type. */
enum Error
{
	TYPEERROR, UNABLETOPARSE, MISSINGFUNCTIONCALL
	
};

/* Removes new lines from a string. Removes \n & " " */
void removeNewlines(std::string& str)
{
	str.erase(std::remove(str.begin(), str.end(), '\n'), str.end());
	str.erase(std::remove(str.begin(), str.end(), ' '), str.end());
}

/* Custom variable parser. Gets the expression &expression and returns true if the variables are synced. */
bool BooleanEqualExpression(const std::string& expression)
{
	std::string beginning_expression = expression.substr(0, expression.find('='));
	std::string end_expression = expression.substr(expression.find('=') + 1, expression.find('\n'));
	std::cout << beginning_expression << " End: " << end_expression << std::endl;
	removeNewlines(beginning_expression);
	removeNewlines(end_expression);
	if (beginning_expression == end_expression)
		return true;
	else
		return false;
}

/* Returns a function name using the given &expression. printf() -> printf */
std::string ReturnFunctionName(const std::string& expression)
{
	std::string function = expression.substr(0, expression.find('('));
	return function;
}

std::string ReturnFunctionParameters(const std::string& expression)
{
	int pos = expression.find('(') + 1;
	std::string functionparams = expression.substr(pos, expression.find(')'));
	
	functionparams.erase(std::remove(functionparams.begin(), functionparams.end(), ')'), functionparams.end());
	
	return functionparams;
}

/* Returns an error by error enum constant. */
std::string Error(Error e)
{
	if (e == UNABLETOPARSE)
		return "Unable to Parse expression. __LC__98:UTPERR";
	else if (e == Error::TYPEERROR)
		return "TypeError: Unable to Parse a Type with another. __LC__98:TERR";
	else
		return "No Error specified.";
}

#endif //LAMBDA_LAMBDACLIB_H

#ifndef __TOKEN
#define __TOKEN
/* Adding More / Removing more Characters to a string to identify the string by it's code. */
/* TOKENIZE Returns NULL If flopped. */
/* @notoken Returns DISABLED. */
/* Check string eval() */
/* c = Character */
/* i = Integer */
std::string TOKENIZE(const std::string& expression)
{
	/* Loop Until Expression size = NULL */
	for (int i = 0; i < expression.size(); ++i)
	{
		if (expression == "@notoken")
		{
			return "Statically Disabled.";
		}
		else
			return expression;
	}
	return "Fail";
}

/* Redirect stdout evaluation. */
std::string STATIC_CHECK(const std::string& expr)
{
	std::string funcname = ReturnFunctionName(expr);
	std::string funcparams = ReturnFunctionParameters(expr);
	if (funcname == "println")
	{
		return funcparams;
	}
	else if (funcname == "mathexpr")
	{
		return std::to_string(std::stoi(funcparams));
	}
	else
	{
		return "INVALID CASE OF INVALID_FUNCTION";
	}
}

#endif
#ifndef _CLASSES
#define _CLASSES
/*
 * The System Class Inherits A LambdaC Library.
 * System Contains Stdout, Stdin, And Other C Functions.
 */
/**
 * The SuperC Class Is a basic class that buidls */

#endif