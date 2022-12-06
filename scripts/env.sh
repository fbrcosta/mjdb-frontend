#!/usr/bin/env bash

# get script folder
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )";

# validate software: python3
$(/usr/bin/env python3 --version > /dev/null 2>&1) || \
    (echo "error: python3 not installed" &&
    exit 1);
# validate version higher or equal to 3.9
#[[ "$(/usr/bin/env python3 -c 'import sys; print(sys.version_info[1])')" -lt "9" ]] && \
#    echo "error: python3 version less than 3.9" &&
#    exit 1;
# validate nodeenv module installed
$(/usr/bin/env python3 -c "import nodeenv" > /dev/null 2>&1) || \
    (echo "error: 'nodeenv' module not installed" &&
    exit 1);

# --- vars --------------------------------------------------------------------

# backup vars
node_bak=${NODE_VERSION};
npm_bak=${NPM_VERSION};

# load vars if .env file exists
[[ -f "${SCRIPT_DIR}/.env" ]] && \
    echo "loading ${SCRIPT_DIR}/.env" && \
    . ${SCRIPT_DIR}/.env;

# set vars
NODE_VERSION=${node_bak:=${NODE_VERSION:-15.10.0}};
NPM_VERSION=${npm_bak:=${NPM_VERSION:-7.5.3}};

# debug versions
echo "using node: ${NODE_VERSION}";
echo "using npm: ${NPM_VERSION}";

# --- environment -------------------------------------------------------------

# check if environment already exists
[[ -d "${SCRIPT_DIR}/../env" ]] && \
    echo "node environment already exists" && 
    exit 1;

# create environment
/usr/bin/env python3 -m nodeenv \
    --node="${NODE_VERSION}" \
    --npm="${NPM_VERSION}" \
    "${SCRIPT_DIR}/../env";

# activate it
. "${SCRIPT_DIR}/../env/bin/activate";

# install dependencies
npm --prefix "${SCRIPT_DIR}/.." install --legacy-peer-deps;
