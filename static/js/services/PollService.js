services.factory('pollService', function ($http,$location,$window) {

    var service = {};

    var genericPollPost = function(pollId,payload,onSuccess,onFailure) {
        $http.post("/poll/"+pollId, payload)
        .success(onSuccess)
        .error(onFailure);
    }


    /**
    *	Sends post request to create a new poll, handles response
    *
    */
    service.createPoll = function(data,onSuccess, onFailure) {

    	$http.post('/create',data)
    	.success(onSuccess)
    	.error(onFailure);
    };

    service.getPollInfo = function(pollId,onSuccess,onFailure) {
    	$http.get('/poll/'+pollId)
    	.success(onSuccess)
    	.error(onFailure);
    };

    service.updatePoll = function(pollId,data,onSuccess,onFailure) {
    	$http.put(/poll/+pollId,data)
    	.success(onSuccess)
    	.error(onFailure);
    };

    service.gatherPollInfo = function($scope) {

    	return function () {

    		var data = {};
    		data.name = $scope.pollName;
    		data.description = $scope.pollDesc;
    		data.creator_name = $scope.creatorName;
    		data.creator_mail = $scope.creatorMail;
    		data.timezone = $scope.timezone;

    		data.required_groups = [];
    		for (var group in $scope.groups) {
    			data.required_groups.push([group,$scope.groups[group]]);
    		}     

    		var startDate = $scope.startDate;
    		var endDate = $scope.endDate;
    		var declEndDate = $scope.declEndDate;
    		var startTime = $scope.startTime;
    		var endTime = $scope.endTime;
    		var declEndTime = $scope.declEndTime;

    		startDate.setHours(startTime.getHours());
    		startDate.setMinutes(startTime.getMinutes());

    		endDate.setHours(endTime.getHours());
    		endDate.setMinutes(endTime.getMinutes());

    		declEndDate.setHours(declEndTime.getHours());
    		declEndDate.setMinutes(declEndTime.getMinutes());

    		data.start_time = startDate;
    		data.end_time = endDate;
    		data.declaration_end_time = declEndDate;

    		return data;
    	};
    };

    service.networkToGui = function(data) {
    	
    	var converted = {};

    	converted.pollName = data.name;
    	converted.pollDesc = data.description;
    	converted.creatorName = data.creator_name;
    	converted.creatorMail = data.creator_mail;
    	converted.timezone = data.timezone;
    	converted.groups = data.required_groups;
    	converted.endDate = new Date(data.end_time);
		converted.endTime = new Date(data.end_time);
		converted.startDate = new Date(data.start_time);
		converted.startTime = new Date(data.start_time);
		converted.declEndTime = new Date(data.declaration_end_time);
		converted.declEndDate = new Date(data.declaration_end_time);

    	return converted;
    };

    // user poll related functions

    service.newUserPoll = function(poll, onSuccess, onFailure) {
    	$http.post("/userpoll",poll)
    	.success(onSuccess)
    	.error(onFailure);
    };


    service.getUserPolls = function(pollId, onSuccess, onFailure) {
    	$http.get("/userpolls/"+pollId)
    	.success(onSuccess)
    	.error(onFailure);
    };

    service.newTerm = function(pollId, term, onSuccess, onFailure) {
        $http.post("/poll/"+pollId+"/term", term)
        .success(onSuccess)
        .error(onFailure);
    };

    service.deleteTerm = function(pollId, termId, onSuccess, onFailure) {
        $http.delete("/poll/"+pollId+"/term/"+termId)
        .success(onSuccess)
        .error(onFailure);
    };

    service.voteOnTerm = function(pollId, termId, onSuccess, onFailure) {
        $http.post("/poll/"+pollId+"/term/vote/"+termId)
        .success(onSuccess)
        .error(onFailure);
    };

    service.deleteTerm = function(pollId, termId, onSuccess, onFailure) {
        $http.delete("/poll/"+pollId+"/term/"+termId)
        .success(onSuccess)
        .error(onFailure);
    }

    service.finishDeclarationPhase = function(pollId, onSuccess, onFailure) {

        var payload = {
            operation : "FINISH_DECLARATION_PHASE"
        };

        genericPollPost(pollId,payload,onSuccess,onFailure);

    }

    service.finishVotingPhase = function(pollId, onSuccess, onFailure) {

        var payload = {
            operation: "FINISH_VOTING_PHASE"
        };

        genericPollPost(pollId,payload,onSuccess,onFailure);
    }
    
    return service;
});