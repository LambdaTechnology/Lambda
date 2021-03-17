cmake_minimum_required(VERSION 3.17)
project(Lambda C CXX)

set(CMAKE_C_STANDARD 11)
set(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} -static  ")
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "../bin")


add_executable(lambac
        LambdaC/MethodExtraction.cpp)

add_executable(lambdac LambdaC/FileTree/LambdaCLib.cpp)
