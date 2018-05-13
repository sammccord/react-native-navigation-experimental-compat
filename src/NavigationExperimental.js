/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
'use strict';

var NavigationCard = require('./NavigationCard');
var NavigationCardStack = require('./NavigationCardStack');
var NavigationHeader = require('./NavigationHeader');
var NavigationPropTypes = require('./NavigationPropTypes');
var NavigationStateUtils = require('./NavigationStateUtils');
var NavigationTransitioner = require('./NavigationTransitioner');

var NavigationExperimental = {
  // Core
  StateUtils: NavigationStateUtils,

  // Views
  Transitioner: NavigationTransitioner,

  // CustomComponents:
  Card: NavigationCard,
  CardStack: NavigationCardStack,
  Header: NavigationHeader,

  PropTypes: NavigationPropTypes
};

module.exports = NavigationExperimental;