export const queryElement = (selectorOrElement, method = "querySelector") => {
  if (typeof selectorOrElement === "string") {
    return document[method](selectorOrElement);
  } else if (selectorOrElement instanceof HTMLElement) {
    return selectorOrElement;
  } else {
    throw new Error(
      "Invalid argument passed to queryElement. It should be a selector string or an HTMLElement."
    );
  }
};

export const queryElementLog = (
  selectorOrElement,
  method = "querySelector"
) => {
  let result;
  if (typeof selectorOrElement === "string") {
    result = document[method](selectorOrElement);
  } else if (selectorOrElement instanceof HTMLElement) {
    result = selectorOrElement;
  } else {
    throw new Error(
      "Invalid argument passed to queryElement. It should be a selector string or an HTMLElement."
    );
  }
  console.log(`queryElement result for ${selectorOrElement}:`, result);
  return result;
};

export const closestElement = (evt, selector) => evt.target.closest(selector);

export const callIfFunction = (callback) =>
  typeof callback === "function" && callback();

export const styleDisplayValue = (displayValue, targetElement, callback) => {
  callIfFunction(callback);
  const style = targetElement.style;
  return (style.display = displayValue);
};

export const contains = (targetClassName, targetElement) =>
  targetElement.classList.contains(targetClassName);

export const togglePopupDisplay = (
  targetClassName,
  targetElement,
  callback
) => {
  const isOpen = contains(targetClassName, targetElement);
  styleDisplayValue(isOpen ? "hidden" : "block", targetElement, callback);
};

export const toggle = (targetClassName, targetElement) =>
  targetElement.classList.toggle(targetClassName);

export const remove = (targetClassName, targetElement) =>
  targetElement.classList.remove(targetClassName);

export const add = (targetClassName, targetElement) =>
  targetElement.classList.add(targetClassName);

export const setElementColor = (element, color) =>
  element ? (element.style.color = color) : null;

export const setAttributes = (targetElement, attributes) => {
  for (let attribute in attributes) {
    targetElement.setAttribute(attribute, attributes[attribute]);
  }
};

export const setElementAttributes = (targetElement, attributes) => {
  for (const [key, value] of Object.entries(attributes)) {
    targetElement.setAttribute(key, value);
  }
};

export const setElementProperties = (elements, propertiesArray) => {
  elements.forEach((element, index) => {
    if (element && propertiesArray[index]) {
      Object.entries(propertiesArray[index]).forEach(([key, value]) => {
        element[key] = value;
      });
    }
  });
};

export const getStartsWithDot = (string) => string.startsWith(".");

export const removeStartingDot = (string) => () =>
  getStartsWithDot(string) ? string.slice(1) : string;

export const addStartingDot = (string) => () =>
  getStartsWithDot(string) ? string : "." + string;

export const evtTargetClosestElement = (targetClassName, targetElement) =>
  targetElement.closest(addStartingDot(`${targetClassName}`)());

export const isTargetElementClicked = (targetClassName, targetElement) =>
  contains(targetClassName, targetElement) &&
  evtTargetClosestElement(
    removeStartingDot(`${targetClassName}`)(),
    targetElement
  );

export const handleKeyPressFunction = (removePopupFunc) => (evt) =>
  evt.key === "Escape" ? callIfFunction(removePopupFunc) : null;

export const handleOutsideClickFunction =
  (targetClassName, removePopupFunc) => (evt) =>
    isTargetElementClicked(targetClassName, evt.target)
      ? callIfFunction(removePopupFunc)
      : null;

export const preventDefaultAndCall = (callback) => {
  return (evt) => {
    evt.preventDefault();
    callback(evt);
  };
};

export const addEventToDOM = (evt, handler, targetElement) =>
  targetElement.addEventListener(evt, handler);

export const removeEventFromDOM = (evt, handler, targetElement) =>
  targetElement.removeEventListener(evt, handler);

export const applyEventListeners = (events) => {
  events.forEach(({ type, callback, element }) => {
    if (element) {
      addEventToDOM(type, callback, element);
    }
  });
};

export const setButtonFunctionById = (buttonFunctions, evt) => {
  const buttonFunctionById = buttonFunctions[evt.target.id];
  buttonFunctionById ? buttonFunctionById(evt) : null;
};

export const animateOpacity = (
  targetElement,
  startOpacity,
  endOpacity,
  duration,
  removeOnFinish = false
) => {
  return new Promise((resolve) => {
    const animation = targetElement.animate(
      [{ opacity: startOpacity }, { opacity: endOpacity }],
      {
        duration: duration,
        easing: "ease-in-out",
      }
    );
    animation.onfinish = () => {
      if (removeOnFinish) {
        targetElement.remove();
      }
      resolve();
    };
  });
};

export const handleLikeFunctionAsync = async (
  instanceThis,
  evt,
  icon,
  iconEnabledAlt,
  iconDisabledAlt,
  iconEnabled,
  iconDisabled,
  updateLikesFn,
  apiInstance,
  addLikeFn,
  removeLikeFn,
  currentUserId,
  dataId
) => {
  const targetIcon = evtTargetClosestElement(icon, evt.target);

  if (isTargetElementClicked(icon, evt.target)) {
    let isLiked = instanceThis._data.likes.some(
      (user) => user._id === currentUserId
    );

    const updatedCard = await (isLiked
      ? removeLikeFn.call(apiInstance, dataId)
      : addLikeFn.call(apiInstance, dataId));

    instanceThis._data.likes = updatedCard.likes;
    callIfFunction(updateLikesFn);

    setAttributes(targetIcon, {
      src: isLiked ? iconDisabled : iconEnabled,
      alt: isLiked ? iconDisabledAlt : iconEnabledAlt,
    });

    targetIcon.setAttribute("data-liked", isLiked ? "true" : "false");
    animateOpacity(targetIcon, 0, 1, 300);
  }
};

export const handleDeleteFunction = (evt, btnIcon, targetIcon) => {
  if (isTargetElementClicked(btnIcon, evt.target)) {
    const btnDelete = evtTargetClosestElement(targetIcon, evt.target);
    animateOpacity(btnDelete, 1, 0, 300, true);
  }
};
