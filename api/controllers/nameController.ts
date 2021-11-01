export const takeName = async (req, res) => {
  try {
    res.status(200).json({ task: 'takeName' });
  } catch (error) {
    res.status(400).text(error);
  }
}

export const getName = async (req, res) => {
  try {
    res.status(200).json({ task: 'getName' });
  } catch (error) {
    res.status(400).text(error);
  }
}