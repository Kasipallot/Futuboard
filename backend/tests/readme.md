Pytest can be run with the command:
$ pytest

Due to having to import django settings, the tests have to be run from the root of the backend folder. (./backend)

Running one test:
$ pytest PATH_TO_TEST_FILE::TEST_NAME

Running all tests in a file:
$ pytest PATH_TO_TEST_FILE

All test files have to be named test_NAME.py and the test functions have to be named test_NAME.