var stopWatch = new stopWatch();

function stopWatch() {
	var startTime = new Date();
	var currentTime = new Date();
	var data = new stopWatchData();
	var clockTimer;
	var state = "cleared";

	this.init = function() {
		$('#stop').click(function() { stopWatch.stop(); return false; });
		$('#clear').click(function() { stopWatch.clear(); return false; });
		$('#start').click(function() { stopWatch.start(); return false; });
		$('#split').click(function() { stopWatch.setSplitNow(); return false; });
		$("#clock").val("000");
		$('#split').hide();
		$('#clear').hide();
	}

	this.start = function() {
		if (state == "cleared") {
			startTime = new Date();
			state = "running";
			this.setCurrent();
			$('#start').hide();
			$('#split').show();
		}
	}

	this.stop = function() {
		if (state != "stopped") {
			clearTimeout(clockTimer);
			this.setSplit(currentTime);
			state = "stopped";
			$('#stop').hide();
			$('#clear').show();
		}
	}

	this.clear = function() {
		if (state == "stopped") {
			$("#clock").val("0.00");
			data = new stopWatchData();
			$('#splits').text("");
			state = "cleared";
			$('#start').show();
			$('#split').hide();
			$('#stop').show();
			$('#clear').hide();	
		}
	}

	this.current = function() {
		currentTime = new Date();
		var duration = currentTime - startTime;
		return formatDuration(duration);
	}

	this.setCurrent = function() {
		if (state == "running") {
			$("#clock").val(stopWatch.current());
			var _this = this;
			clockTimer = setTimeout(function() { _this.setCurrent(); }, 1);
		}	
	}

	this.setSplitNow = function() {
		var timeNow = new Date();
		this.setSplit(timeNow);
	}

	this.setSplit = function(timeNow) {
		if (state == "running") {
			data.splits.push(timeNow - startTime);
			var displaySplits = new Array();
			var prev = 0;
			data.splits.forEach(function(split) {
				displaySplit = formatDuration(split - prev); 
				displaySplits.push(displaySplit);
				prev = split;	
			});
			$('#splits').text(displaySplits.join(" | "));	
		}		
	}

}

function stopWatchData() {
	this.splits = [];
}

function formatDuration(milli) {
		var seconds = (milli/1000).toFixed(2);
		var minutes = Math.floor(milli/(60*1000));
		var duration = "0.00";
		if (minutes == 0) {
			duration = seconds.toString();	
		} else {
			duration = minutes.toFixed(0) + ":" + (seconds - minutes*60).toFixed(2);
		}
		return duration;	
	}
	