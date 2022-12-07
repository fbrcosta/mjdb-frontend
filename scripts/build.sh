#!/usr/bin/env bash

# get script folder
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )";

# --- environment -------------------------------------------------------------

# setup environment and install dependencies
/usr/bin/env bash "${SCRIPT_DIR}/envsetup.sh";

# activate the environment
. "${SCRIPT_DIR}/../env/bin/activate";

# build application
npm --prefix "${SCRIPT_DIR}/.." run build;
