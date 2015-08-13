var simpleCalculator = angular.module('SimpleCalculator', ['ngMaterial']);

simpleCalculator.service('Calculator', function () {
	return {
		plus: function (op) {
			op.lastResult = op.leftNode + op.rigthNode;
			op.text = op.lastResult;
		},
		multiply: function (op) {
			op.lastResult = op.leftNode * op.rigthNode;
			op.text = op.lastResult;
		},
		div: function (op) {
			op.lastResult = op.leftNode / op.rigthNode;
			op.text = op.lastResult;
		},
		minus: function (op) {
			op.lastResult = op.leftNode - op.rigthNode;
			op.text = op.lastResult;
		}
	};
});
	
simpleCalculator.controller('MainController', ['$scope', 'Calculator', 
	function ($scope, Calculator) {
		$scope.operation = {
			text: undefined,
			leftNode: undefined,
			rigthNode: undefined,
			operator: undefined,
			lastResult: undefined
		};
		$scope.numberClick = function (num) {
			if ($scope.operation.text === undefined) {
				$scope.operation.text = num.toString();
				return;
			}
			
			if ($scope.operation.text.length >= 10) {
				return;
			}
			
			$scope.operation.text += num.toString();
		};
		$scope.operatorClick = function (op) {
			if ($scope.operation.text === undefined) {
				return;
			}
			
			if ($scope.operation.operator === undefined) {
				$scope.operation.operator = op;
				$scope.operation.text += op;
				return;
			}
			
			if (op === '=') {
				var nodes = $scope.operation.text.split($scope.operation.operator);
				$scope.operation.leftNode = parseInt(nodes[0]);
				$scope.operation.rigthNode = parseInt(nodes[1]);
				switch ($scope.operation.operator) {
					case '+':
						Calculator.plus($scope.operation)
						break;
					case '-':
						Calculator.minus($scope.operation);
						break;
					case '*':
						Calculator.multiply($scope.operation);
						break;
					case '/':
						Calculator.div($scope.operation);
						break;
					default:
						break;
				};
			}
		};
		$scope.clearOperation = function () {
			$scope.operation = {
				text: undefined,
				leftNode: undefined,
				rigthNode: undefined,
				operator: undefined,
				lastResult: undefined
			};
		};
	}
]);