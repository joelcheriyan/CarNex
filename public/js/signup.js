var classes="col-xs-3 bs-wizard-step ";function stepOne(){document.getElementById("step1-prog").className=classes+"active";document.getElementById("step2-prog").className=classes+"disabled";document.getElementById("step3-prog").className=classes+"disabled";document.getElementById("step4-prog").className=classes+"disabled";document.getElementById("step1").style.display="block";document.getElementById("step2").style.display="none";document.getElementById("step3").style.display="none";document.getElementById("step4").style.display="none";}function stepTwo(){document.getElementById("step1-prog").className=classes+"complete";document.getElementById("step2-prog").className=classes+"active";document.getElementById("step3-prog").className=classes+"disabled";document.getElementById("step4-prog").className=classes+"disabled";document.getElementById("step1").style.display="none";document.getElementById("step2").style.display="block";document.getElementById("step3").style.display="none";document.getElementById("step4").style.display="none";}function stepThree(){document.getElementById("step1-prog").className=classes+"complete";document.getElementById("step2-prog").className=classes+"complete";document.getElementById("step3-prog").className=classes+"active";document.getElementById("step4-prog").className=classes+"disabled";document.getElementById("step1").style.display="none";document.getElementById("step2").style.display="none";document.getElementById("step3").style.display="block";document.getElementById("step4").style.display="none";}function stepFour(){document.getElementById("step1-prog").className=classes+"complete";document.getElementById("step2-prog").className=classes+"complete";document.getElementById("step3-prog").className=classes+"complete";document.getElementById("step4-prog").className=classes+"active";document.getElementById("step1").style.display="none";document.getElementById("step2").style.display="none";document.getElementById("step3").style.display="none";document.getElementById("step4").style.display="block";}
